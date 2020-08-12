import { Construct } from 'constructs';
import { App, TerraformStack, RemoteBackend } from 'cdktf';
import { GoogleProvider, ContainerCluster, ContainerNodePool, ServiceAccount, ProjectIamMember } from './.gen/providers/google';
import { GoogleBetaProvider } from './.gen/providers/google-beta';
import { Kubernetes } from './.gen/modules/joatmon08/kubernetes/google';
import { variables, toggles } from './tfvars.json';
import { organization, workspaces } from './backend.json';

class FeatureFlagStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const zone = variables.zone;
    const environment = variables.environment;
    const project = variables.project;

    new RemoteBackend(this, {
      organization: organization,
      workspaces: workspaces,
    });

    new GoogleProvider(this, 'google', {
      zone: zone,
      project: project,
    });

    new GoogleBetaProvider(this, 'google-beta', {
      zone: zone,
      project: project,
    });

    const serviceAccount = new ServiceAccount(this, 'feature_flags_service_account', {
      accountId: `${environment}-feature-flags`,
      displayName: "Service Account for GKE"
    });

    if (JSON.parse(toggles.enable_pubsub_publisher)) {
      new ProjectIamMember(this, 'feature_flags_pubsub_publisher', {
        role: "roles/pubsub.publisher",
        member: `serviceAccount:${serviceAccount.email}`,
      });
    }

    new ProjectIamMember(this, 'feature_flags_pubsub_subscriber', {
      role: "roles/pubsub.subscriber",
      member: `serviceAccount:${serviceAccount.email}`,
    });

    const cluster = new ContainerCluster(this, 'feature_flags_cluster', {
      name: `${environment}-feature-flags`,
      location: zone,
      removeDefaultNodePool: true,
      initialNodeCount: 1,
      masterAuth: [{
        username: '',
        password: '',
        clientCertificateConfig: [
          {
            issueClientCertificate: false,
          },
        ],
      }],
    });

    new ContainerNodePool(this, 'feature_flags_node_pool', {
      dependsOn: [serviceAccount],
      name: `${environment}-feature-flags-node-pool`,
      location: zone,
      cluster: cluster.name,
      nodeCount: 1,
      nodeConfig: [
        {
          preemptible: true,
          machineType: 'e2-medium',
          serviceAccount: serviceAccount.id,
          oauthScopes: [
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring",
          ]
        }
      ],
    });

    var moduleConfig = {
      zone: zone,
      project: project,
      serviceAccountId: serviceAccount.id,
      versionIdentifier: 'v2',
      environment: 'prod',
      enableHighmemNodepool: false,
    }

    if (JSON.parse(toggles.enable_highmem_nodepool)) {
      moduleConfig.enableHighmemNodepool = true;
    }

    if (JSON.parse(toggles.enable_workload_identity)) {
      new Kubernetes(this, 'feature_flags_k8s_v2', moduleConfig);
    }

    
  }
}

const app = new App();
new FeatureFlagStack(app, 'cdk');
app.synth();
