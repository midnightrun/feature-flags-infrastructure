// https://www.terraform.io/docs/providers/google-beta/r/google_compute_shared_vpc_host_project.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import { TerraformResource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';

// Configuration

export interface GoogleComputeSharedVpcHostProjectConfig extends TerraformMetaArguments {
  /** The ID of the project that will serve as a Shared VPC host project */
  readonly project: string;
  /** timeouts block */
  readonly timeouts?: GoogleComputeSharedVpcHostProjectTimeouts;
}
export interface GoogleComputeSharedVpcHostProjectTimeouts {
  readonly create?: string;
  readonly delete?: string;
}

// Resource

export class GoogleComputeSharedVpcHostProject extends TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: GoogleComputeSharedVpcHostProjectConfig) {
    super(scope, id, {
      terraformResourceType: 'google_compute_shared_vpc_host_project',
      terraformGeneratorMetadata: {
        providerName: 'google-beta'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._project = config.project;
    this._timeouts = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // id - computed: true, optional: true, required: false
  private _id?: string;
  public get id() {
    return this._id ?? this.getStringAttribute('id');
  }
  public set id(value: string | undefined) {
    this._id = value;
  }

  // project - computed: false, optional: false, required: true
  private _project: string;
  public get project() {
    return this._project;
  }
  public set project(value: string) {
    this._project = value;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts?: GoogleComputeSharedVpcHostProjectTimeouts;
  public get timeouts() {
    return this._timeouts;
  }
  public set timeouts(value: GoogleComputeSharedVpcHostProjectTimeouts | undefined) {
    this._timeouts = value;
  }

  // =========
  // SYNTHESIS
  // =========

  public synthesizeAttributes(): { [name: string]: any } {
    return {
      project: this._project,
      timeouts: this._timeouts,
    };
  }
}
