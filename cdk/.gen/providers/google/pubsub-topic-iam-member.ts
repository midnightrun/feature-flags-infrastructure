// https://www.terraform.io/docs/providers/google/r/pubsub_topic_iam_member.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import { TerraformResource } from 'cdktf';
import { TerraformMetaArguments } from 'cdktf';

// Configuration

export interface PubsubTopicIamMemberConfig extends TerraformMetaArguments {
  readonly member: string;
  readonly project?: string;
  readonly role: string;
  readonly topic: string;
  /** condition block */
  readonly condition?: PubsubTopicIamMemberCondition[];
}
export interface PubsubTopicIamMemberCondition {
  readonly description?: string;
  readonly expression: string;
  readonly title: string;
}

// Resource

export class PubsubTopicIamMember extends TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: PubsubTopicIamMemberConfig) {
    super(scope, id, {
      terraformResourceType: 'google_pubsub_topic_iam_member',
      terraformGeneratorMetadata: {
        providerName: 'google'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this._member = config.member;
    this._project = config.project;
    this._role = config.role;
    this._topic = config.topic;
    this._condition = config.condition;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // etag - computed: true, optional: false, required: true
  public get etag() {
    return this.getStringAttribute('etag');
  }

  // id - computed: true, optional: true, required: false
  private _id?: string;
  public get id() {
    return this._id ?? this.getStringAttribute('id');
  }
  public set id(value: string | undefined) {
    this._id = value;
  }

  // member - computed: false, optional: false, required: true
  private _member: string;
  public get member() {
    return this._member;
  }
  public set member(value: string) {
    this._member = value;
  }

  // project - computed: true, optional: true, required: false
  private _project?: string;
  public get project() {
    return this._project ?? this.getStringAttribute('project');
  }
  public set project(value: string | undefined) {
    this._project = value;
  }

  // role - computed: false, optional: false, required: true
  private _role: string;
  public get role() {
    return this._role;
  }
  public set role(value: string) {
    this._role = value;
  }

  // topic - computed: false, optional: false, required: true
  private _topic: string;
  public get topic() {
    return this._topic;
  }
  public set topic(value: string) {
    this._topic = value;
  }

  // condition - computed: false, optional: true, required: false
  private _condition?: PubsubTopicIamMemberCondition[];
  public get condition() {
    return this._condition;
  }
  public set condition(value: PubsubTopicIamMemberCondition[] | undefined) {
    this._condition = value;
  }

  // =========
  // SYNTHESIS
  // =========

  public synthesizeAttributes(): { [name: string]: any } {
    return {
      member: this._member,
      project: this._project,
      role: this._role,
      topic: this._topic,
      condition: this._condition,
    };
  }
}
