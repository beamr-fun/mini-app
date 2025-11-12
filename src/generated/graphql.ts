/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  numeric: any;
  timestamptz: any;
};

/** columns and relationships of "Beam" */
export type Beam = {
  __typename?: 'Beam';
  /** An object relationship */
  beamPool?: Maybe<BeamPool>;
  beamPool_id: Scalars['String'];
  /** An object relationship */
  beamR?: Maybe<BeamrGlobal>;
  beamR_id: Scalars['String'];
  chainId: Scalars['Int'];
  /** An object relationship */
  from?: Maybe<User>;
  from_id: Scalars['String'];
  id: Scalars['String'];
  isReceiverConnected: Scalars['Boolean'];
  lastUpdated: Scalars['Int'];
  /** An array relationship */
  memberUnitsUpdated: Array<MemberUnitsUpdated>;
  /** An object relationship */
  recipientAccount?: Maybe<UserAccount>;
  recipientAccount_id: Scalars['String'];
  /** An object relationship */
  to?: Maybe<User>;
  to_id: Scalars['String'];
  units: Scalars['numeric'];
};


/** columns and relationships of "Beam" */
export type BeamMemberUnitsUpdatedArgs = {
  distinct_on?: InputMaybe<Array<MemberUnitsUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MemberUnitsUpdated_Order_By>>;
  where?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};

/** columns and relationships of "BeamPool" */
export type BeamPool = {
  __typename?: 'BeamPool';
  active: Scalars['Boolean'];
  adjustmentFlowRate: Scalars['numeric'];
  adjustmentMember: Scalars['String'];
  allRecipients: Array<Scalars['String']>;
  beamCount: Scalars['Int'];
  /** An object relationship */
  beamR?: Maybe<BeamrGlobal>;
  beamR_id: Scalars['String'];
  /** An array relationship */
  beams: Array<Beam>;
  chainId: Scalars['Int'];
  /** An object relationship */
  creator?: Maybe<User>;
  /** An object relationship */
  creatorAccount?: Maybe<UserAccount>;
  creatorAccount_id: Scalars['String'];
  creator_id: Scalars['String'];
  /** An array relationship */
  distributionUpdates: Array<DistributionUpdated>;
  flowRate: Scalars['numeric'];
  id: Scalars['String'];
  /** An object relationship */
  lastDistroUpdate?: Maybe<DistributionUpdated>;
  lastDistroUpdate_id?: Maybe<Scalars['String']>;
  lastUpdated: Scalars['Int'];
  /** An array relationship */
  memberUnitsUpdated: Array<MemberUnitsUpdated>;
  /** An object relationship */
  metadata?: Maybe<PoolMetadata>;
  metadata_id: Scalars['String'];
  /** An object relationship */
  poolAdminRole?: Maybe<Role>;
  poolAdminRole_id: Scalars['String'];
  token: Scalars['String'];
  totalUnits: Scalars['numeric'];
};


/** columns and relationships of "BeamPool" */
export type BeamPoolBeamsArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


/** columns and relationships of "BeamPool" */
export type BeamPoolDistributionUpdatesArgs = {
  distinct_on?: InputMaybe<Array<DistributionUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DistributionUpdated_Order_By>>;
  where?: InputMaybe<DistributionUpdated_Bool_Exp>;
};


/** columns and relationships of "BeamPool" */
export type BeamPoolMemberUnitsUpdatedArgs = {
  distinct_on?: InputMaybe<Array<MemberUnitsUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MemberUnitsUpdated_Order_By>>;
  where?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};

/** order by aggregate values of table "BeamPool" */
export type BeamPool_Aggregate_Order_By = {
  avg?: InputMaybe<BeamPool_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BeamPool_Max_Order_By>;
  min?: InputMaybe<BeamPool_Min_Order_By>;
  stddev?: InputMaybe<BeamPool_Stddev_Order_By>;
  stddev_pop?: InputMaybe<BeamPool_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<BeamPool_Stddev_Samp_Order_By>;
  sum?: InputMaybe<BeamPool_Sum_Order_By>;
  var_pop?: InputMaybe<BeamPool_Var_Pop_Order_By>;
  var_samp?: InputMaybe<BeamPool_Var_Samp_Order_By>;
  variance?: InputMaybe<BeamPool_Variance_Order_By>;
};

/** order by avg() on columns of table "BeamPool" */
export type BeamPool_Avg_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BeamPool". All fields are combined with a logical 'AND'. */
export type BeamPool_Bool_Exp = {
  _and?: InputMaybe<Array<BeamPool_Bool_Exp>>;
  _not?: InputMaybe<BeamPool_Bool_Exp>;
  _or?: InputMaybe<Array<BeamPool_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  adjustmentFlowRate?: InputMaybe<Numeric_Comparison_Exp>;
  adjustmentMember?: InputMaybe<String_Comparison_Exp>;
  allRecipients?: InputMaybe<String_Array_Comparison_Exp>;
  beamCount?: InputMaybe<Int_Comparison_Exp>;
  beamR?: InputMaybe<BeamrGlobal_Bool_Exp>;
  beamR_id?: InputMaybe<String_Comparison_Exp>;
  beams?: InputMaybe<Beam_Bool_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  creator?: InputMaybe<User_Bool_Exp>;
  creatorAccount?: InputMaybe<UserAccount_Bool_Exp>;
  creatorAccount_id?: InputMaybe<String_Comparison_Exp>;
  creator_id?: InputMaybe<String_Comparison_Exp>;
  distributionUpdates?: InputMaybe<DistributionUpdated_Bool_Exp>;
  flowRate?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lastDistroUpdate?: InputMaybe<DistributionUpdated_Bool_Exp>;
  lastDistroUpdate_id?: InputMaybe<String_Comparison_Exp>;
  lastUpdated?: InputMaybe<Int_Comparison_Exp>;
  memberUnitsUpdated?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  metadata?: InputMaybe<PoolMetadata_Bool_Exp>;
  metadata_id?: InputMaybe<String_Comparison_Exp>;
  poolAdminRole?: InputMaybe<Role_Bool_Exp>;
  poolAdminRole_id?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  totalUnits?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "BeamPool" */
export type BeamPool_Max_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentMember?: InputMaybe<Order_By>;
  allRecipients?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  creatorAccount_id?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastDistroUpdate_id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  metadata_id?: InputMaybe<Order_By>;
  poolAdminRole_id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "BeamPool" */
export type BeamPool_Min_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentMember?: InputMaybe<Order_By>;
  allRecipients?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  creatorAccount_id?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastDistroUpdate_id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  metadata_id?: InputMaybe<Order_By>;
  poolAdminRole_id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "BeamPool". */
export type BeamPool_Order_By = {
  active?: InputMaybe<Order_By>;
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentMember?: InputMaybe<Order_By>;
  allRecipients?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  beamR?: InputMaybe<BeamrGlobal_Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  beams_aggregate?: InputMaybe<Beam_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
  creator?: InputMaybe<User_Order_By>;
  creatorAccount?: InputMaybe<UserAccount_Order_By>;
  creatorAccount_id?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  distributionUpdates_aggregate?: InputMaybe<DistributionUpdated_Aggregate_Order_By>;
  flowRate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastDistroUpdate?: InputMaybe<DistributionUpdated_Order_By>;
  lastDistroUpdate_id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  memberUnitsUpdated_aggregate?: InputMaybe<MemberUnitsUpdated_Aggregate_Order_By>;
  metadata?: InputMaybe<PoolMetadata_Order_By>;
  metadata_id?: InputMaybe<Order_By>;
  poolAdminRole?: InputMaybe<Role_Order_By>;
  poolAdminRole_id?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** select columns of table "BeamPool" */
export enum BeamPool_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  AdjustmentFlowRate = 'adjustmentFlowRate',
  /** column name */
  AdjustmentMember = 'adjustmentMember',
  /** column name */
  AllRecipients = 'allRecipients',
  /** column name */
  BeamCount = 'beamCount',
  /** column name */
  BeamRId = 'beamR_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatorAccountId = 'creatorAccount_id',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  FlowRate = 'flowRate',
  /** column name */
  Id = 'id',
  /** column name */
  LastDistroUpdateId = 'lastDistroUpdate_id',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  MetadataId = 'metadata_id',
  /** column name */
  PoolAdminRoleId = 'poolAdminRole_id',
  /** column name */
  Token = 'token',
  /** column name */
  TotalUnits = 'totalUnits'
}

/** order by stddev() on columns of table "BeamPool" */
export type BeamPool_Stddev_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "BeamPool" */
export type BeamPool_Stddev_Pop_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "BeamPool" */
export type BeamPool_Stddev_Samp_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BeamPool" */
export type BeamPool_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamPool_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamPool_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']>;
  adjustmentFlowRate?: InputMaybe<Scalars['numeric']>;
  adjustmentMember?: InputMaybe<Scalars['String']>;
  allRecipients?: InputMaybe<Array<Scalars['String']>>;
  beamCount?: InputMaybe<Scalars['Int']>;
  beamR_id?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  creatorAccount_id?: InputMaybe<Scalars['String']>;
  creator_id?: InputMaybe<Scalars['String']>;
  flowRate?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['String']>;
  lastDistroUpdate_id?: InputMaybe<Scalars['String']>;
  lastUpdated?: InputMaybe<Scalars['Int']>;
  metadata_id?: InputMaybe<Scalars['String']>;
  poolAdminRole_id?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  totalUnits?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "BeamPool" */
export type BeamPool_Sum_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "BeamPool" */
export type BeamPool_Var_Pop_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "BeamPool" */
export type BeamPool_Var_Samp_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "BeamPool" */
export type BeamPool_Variance_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  beamCount?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  flowRate?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalUnits?: InputMaybe<Order_By>;
};

/** columns and relationships of "BeamR_Initialized" */
export type BeamR_Initialized = {
  __typename?: 'BeamR_Initialized';
  adminRole: Scalars['String'];
  id: Scalars['String'];
  rootAdminRole: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_Initialized". All fields are combined with a logical 'AND'. */
export type BeamR_Initialized_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_Initialized_Bool_Exp>>;
  _not?: InputMaybe<BeamR_Initialized_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_Initialized_Bool_Exp>>;
  adminRole?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  rootAdminRole?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_Initialized". */
export type BeamR_Initialized_Order_By = {
  adminRole?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rootAdminRole?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_Initialized" */
export enum BeamR_Initialized_Select_Column {
  /** column name */
  AdminRole = 'adminRole',
  /** column name */
  Id = 'id',
  /** column name */
  RootAdminRole = 'rootAdminRole',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_Initialized" */
export type BeamR_Initialized_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_Initialized_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_Initialized_Stream_Cursor_Value_Input = {
  adminRole?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  rootAdminRole?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "BeamR_PoolCreated" */
export type BeamR_PoolCreated = {
  __typename?: 'BeamR_PoolCreated';
  config_0: Scalars['Boolean'];
  config_1: Scalars['Boolean'];
  creator: Scalars['String'];
  id: Scalars['String'];
  metadata_0: Scalars['numeric'];
  metadata_1: Scalars['String'];
  pool: Scalars['String'];
  poolAdminRole: Scalars['String'];
  token: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_PoolCreated". All fields are combined with a logical 'AND'. */
export type BeamR_PoolCreated_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_PoolCreated_Bool_Exp>>;
  _not?: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_PoolCreated_Bool_Exp>>;
  config_0?: InputMaybe<Boolean_Comparison_Exp>;
  config_1?: InputMaybe<Boolean_Comparison_Exp>;
  creator?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  metadata_0?: InputMaybe<Numeric_Comparison_Exp>;
  metadata_1?: InputMaybe<String_Comparison_Exp>;
  pool?: InputMaybe<String_Comparison_Exp>;
  poolAdminRole?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_PoolCreated". */
export type BeamR_PoolCreated_Order_By = {
  config_0?: InputMaybe<Order_By>;
  config_1?: InputMaybe<Order_By>;
  creator?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata_0?: InputMaybe<Order_By>;
  metadata_1?: InputMaybe<Order_By>;
  pool?: InputMaybe<Order_By>;
  poolAdminRole?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_PoolCreated" */
export enum BeamR_PoolCreated_Select_Column {
  /** column name */
  Config_0 = 'config_0',
  /** column name */
  Config_1 = 'config_1',
  /** column name */
  Creator = 'creator',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata_0 = 'metadata_0',
  /** column name */
  Metadata_1 = 'metadata_1',
  /** column name */
  Pool = 'pool',
  /** column name */
  PoolAdminRole = 'poolAdminRole',
  /** column name */
  Token = 'token',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_PoolCreated" */
export type BeamR_PoolCreated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_PoolCreated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_PoolCreated_Stream_Cursor_Value_Input = {
  config_0?: InputMaybe<Scalars['Boolean']>;
  config_1?: InputMaybe<Scalars['Boolean']>;
  creator?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  metadata_0?: InputMaybe<Scalars['numeric']>;
  metadata_1?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['String']>;
  poolAdminRole?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "BeamR_PoolMetadataUpdated" */
export type BeamR_PoolMetadataUpdated = {
  __typename?: 'BeamR_PoolMetadataUpdated';
  id: Scalars['String'];
  metadata_0: Scalars['numeric'];
  metadata_1: Scalars['String'];
  pool: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_PoolMetadataUpdated". All fields are combined with a logical 'AND'. */
export type BeamR_PoolMetadataUpdated_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Bool_Exp>>;
  _not?: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  metadata_0?: InputMaybe<Numeric_Comparison_Exp>;
  metadata_1?: InputMaybe<String_Comparison_Exp>;
  pool?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_PoolMetadataUpdated". */
export type BeamR_PoolMetadataUpdated_Order_By = {
  id?: InputMaybe<Order_By>;
  metadata_0?: InputMaybe<Order_By>;
  metadata_1?: InputMaybe<Order_By>;
  pool?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_PoolMetadataUpdated" */
export enum BeamR_PoolMetadataUpdated_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Metadata_0 = 'metadata_0',
  /** column name */
  Metadata_1 = 'metadata_1',
  /** column name */
  Pool = 'pool',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_PoolMetadataUpdated" */
export type BeamR_PoolMetadataUpdated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_PoolMetadataUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_PoolMetadataUpdated_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']>;
  metadata_0?: InputMaybe<Scalars['numeric']>;
  metadata_1?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "BeamR_RoleAdminChanged" */
export type BeamR_RoleAdminChanged = {
  __typename?: 'BeamR_RoleAdminChanged';
  id: Scalars['String'];
  newAdminRole: Scalars['String'];
  previousAdminRole: Scalars['String'];
  role: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleAdminChanged". All fields are combined with a logical 'AND'. */
export type BeamR_RoleAdminChanged_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_RoleAdminChanged_Bool_Exp>>;
  _not?: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_RoleAdminChanged_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  newAdminRole?: InputMaybe<String_Comparison_Exp>;
  previousAdminRole?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleAdminChanged". */
export type BeamR_RoleAdminChanged_Order_By = {
  id?: InputMaybe<Order_By>;
  newAdminRole?: InputMaybe<Order_By>;
  previousAdminRole?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleAdminChanged" */
export enum BeamR_RoleAdminChanged_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  NewAdminRole = 'newAdminRole',
  /** column name */
  PreviousAdminRole = 'previousAdminRole',
  /** column name */
  Role = 'role',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_RoleAdminChanged" */
export type BeamR_RoleAdminChanged_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_RoleAdminChanged_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleAdminChanged_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']>;
  newAdminRole?: InputMaybe<Scalars['String']>;
  previousAdminRole?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "BeamR_RoleGranted" */
export type BeamR_RoleGranted = {
  __typename?: 'BeamR_RoleGranted';
  account: Scalars['String'];
  id: Scalars['String'];
  role: Scalars['String'];
  sender: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleGranted". All fields are combined with a logical 'AND'. */
export type BeamR_RoleGranted_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_RoleGranted_Bool_Exp>>;
  _not?: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_RoleGranted_Bool_Exp>>;
  account?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  sender?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleGranted". */
export type BeamR_RoleGranted_Order_By = {
  account?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleGranted" */
export enum BeamR_RoleGranted_Select_Column {
  /** column name */
  Account = 'account',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  Sender = 'sender',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_RoleGranted" */
export type BeamR_RoleGranted_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_RoleGranted_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleGranted_Stream_Cursor_Value_Input = {
  account?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "BeamR_RoleRevoked" */
export type BeamR_RoleRevoked = {
  __typename?: 'BeamR_RoleRevoked';
  account: Scalars['String'];
  id: Scalars['String'];
  role: Scalars['String'];
  sender: Scalars['String'];
  /** An object relationship */
  tx?: Maybe<Tx>;
  tx_id: Scalars['String'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleRevoked". All fields are combined with a logical 'AND'. */
export type BeamR_RoleRevoked_Bool_Exp = {
  _and?: InputMaybe<Array<BeamR_RoleRevoked_Bool_Exp>>;
  _not?: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
  _or?: InputMaybe<Array<BeamR_RoleRevoked_Bool_Exp>>;
  account?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  sender?: InputMaybe<String_Comparison_Exp>;
  tx?: InputMaybe<Tx_Bool_Exp>;
  tx_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleRevoked". */
export type BeamR_RoleRevoked_Order_By = {
  account?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  tx?: InputMaybe<Tx_Order_By>;
  tx_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleRevoked" */
export enum BeamR_RoleRevoked_Select_Column {
  /** column name */
  Account = 'account',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  Sender = 'sender',
  /** column name */
  TxId = 'tx_id'
}

/** Streaming cursor of the table "BeamR_RoleRevoked" */
export type BeamR_RoleRevoked_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamR_RoleRevoked_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleRevoked_Stream_Cursor_Value_Input = {
  account?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['String']>;
  tx_id?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "Beam" */
export type Beam_Aggregate_Order_By = {
  avg?: InputMaybe<Beam_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Beam_Max_Order_By>;
  min?: InputMaybe<Beam_Min_Order_By>;
  stddev?: InputMaybe<Beam_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Beam_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Beam_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Beam_Sum_Order_By>;
  var_pop?: InputMaybe<Beam_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Beam_Var_Samp_Order_By>;
  variance?: InputMaybe<Beam_Variance_Order_By>;
};

/** order by avg() on columns of table "Beam" */
export type Beam_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Beam". All fields are combined with a logical 'AND'. */
export type Beam_Bool_Exp = {
  _and?: InputMaybe<Array<Beam_Bool_Exp>>;
  _not?: InputMaybe<Beam_Bool_Exp>;
  _or?: InputMaybe<Array<Beam_Bool_Exp>>;
  beamPool?: InputMaybe<BeamPool_Bool_Exp>;
  beamPool_id?: InputMaybe<String_Comparison_Exp>;
  beamR?: InputMaybe<BeamrGlobal_Bool_Exp>;
  beamR_id?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  from?: InputMaybe<User_Bool_Exp>;
  from_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isReceiverConnected?: InputMaybe<Boolean_Comparison_Exp>;
  lastUpdated?: InputMaybe<Int_Comparison_Exp>;
  memberUnitsUpdated?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  recipientAccount?: InputMaybe<UserAccount_Bool_Exp>;
  recipientAccount_id?: InputMaybe<String_Comparison_Exp>;
  to?: InputMaybe<User_Bool_Exp>;
  to_id?: InputMaybe<String_Comparison_Exp>;
  units?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Beam" */
export type Beam_Max_Order_By = {
  beamPool_id?: InputMaybe<Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  recipientAccount_id?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Beam" */
export type Beam_Min_Order_By = {
  beamPool_id?: InputMaybe<Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  recipientAccount_id?: InputMaybe<Order_By>;
  to_id?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Beam". */
export type Beam_Order_By = {
  beamPool?: InputMaybe<BeamPool_Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  beamR?: InputMaybe<BeamrGlobal_Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  from?: InputMaybe<User_Order_By>;
  from_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isReceiverConnected?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  memberUnitsUpdated_aggregate?: InputMaybe<MemberUnitsUpdated_Aggregate_Order_By>;
  recipientAccount?: InputMaybe<UserAccount_Order_By>;
  recipientAccount_id?: InputMaybe<Order_By>;
  to?: InputMaybe<User_Order_By>;
  to_id?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** select columns of table "Beam" */
export enum Beam_Select_Column {
  /** column name */
  BeamPoolId = 'beamPool_id',
  /** column name */
  BeamRId = 'beamR_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  FromId = 'from_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsReceiverConnected = 'isReceiverConnected',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  RecipientAccountId = 'recipientAccount_id',
  /** column name */
  ToId = 'to_id',
  /** column name */
  Units = 'units'
}

/** order by stddev() on columns of table "Beam" */
export type Beam_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Beam" */
export type Beam_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Beam" */
export type Beam_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Beam" */
export type Beam_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Beam_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Beam_Stream_Cursor_Value_Input = {
  beamPool_id?: InputMaybe<Scalars['String']>;
  beamR_id?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  from_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  isReceiverConnected?: InputMaybe<Scalars['Boolean']>;
  lastUpdated?: InputMaybe<Scalars['Int']>;
  recipientAccount_id?: InputMaybe<Scalars['String']>;
  to_id?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "Beam" */
export type Beam_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Beam" */
export type Beam_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Beam" */
export type Beam_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Beam" */
export type Beam_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
};

/** columns and relationships of "BeamrGlobal" */
export type BeamrGlobal = {
  __typename?: 'BeamrGlobal';
  /** An object relationship */
  adminRole?: Maybe<Role>;
  adminRole_id: Scalars['String'];
  /** An array relationship */
  beamPools: Array<BeamPool>;
  /** An array relationship */
  beams: Array<Beam>;
  chainId: Scalars['Int'];
  id: Scalars['String'];
  /** An object relationship */
  rootAdminRole?: Maybe<Role>;
  rootAdminRole_id: Scalars['String'];
};


/** columns and relationships of "BeamrGlobal" */
export type BeamrGlobalBeamPoolsArgs = {
  distinct_on?: InputMaybe<Array<BeamPool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamPool_Order_By>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};


/** columns and relationships of "BeamrGlobal" */
export type BeamrGlobalBeamsArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "BeamrGlobal". All fields are combined with a logical 'AND'. */
export type BeamrGlobal_Bool_Exp = {
  _and?: InputMaybe<Array<BeamrGlobal_Bool_Exp>>;
  _not?: InputMaybe<BeamrGlobal_Bool_Exp>;
  _or?: InputMaybe<Array<BeamrGlobal_Bool_Exp>>;
  adminRole?: InputMaybe<Role_Bool_Exp>;
  adminRole_id?: InputMaybe<String_Comparison_Exp>;
  beamPools?: InputMaybe<BeamPool_Bool_Exp>;
  beams?: InputMaybe<Beam_Bool_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  rootAdminRole?: InputMaybe<Role_Bool_Exp>;
  rootAdminRole_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamrGlobal". */
export type BeamrGlobal_Order_By = {
  adminRole?: InputMaybe<Role_Order_By>;
  adminRole_id?: InputMaybe<Order_By>;
  beamPools_aggregate?: InputMaybe<BeamPool_Aggregate_Order_By>;
  beams_aggregate?: InputMaybe<Beam_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rootAdminRole?: InputMaybe<Role_Order_By>;
  rootAdminRole_id?: InputMaybe<Order_By>;
};

/** select columns of table "BeamrGlobal" */
export enum BeamrGlobal_Select_Column {
  /** column name */
  AdminRoleId = 'adminRole_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id',
  /** column name */
  RootAdminRoleId = 'rootAdminRole_id'
}

/** Streaming cursor of the table "BeamrGlobal" */
export type BeamrGlobal_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BeamrGlobal_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamrGlobal_Stream_Cursor_Value_Input = {
  adminRole_id?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  rootAdminRole_id?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "DistributionUpdated" */
export type DistributionUpdated = {
  __typename?: 'DistributionUpdated';
  adjustmentFlowRate: Scalars['numeric'];
  adjustmentFlowRecipient: Scalars['String'];
  /** An object relationship */
  beamPool?: Maybe<BeamPool>;
  beamPool_id: Scalars['String'];
  distributor: Scalars['String'];
  id: Scalars['String'];
  newFlowRateFromDistributor: Scalars['numeric'];
  newTotalDistributionFlowRate: Scalars['numeric'];
  oldFlowRate: Scalars['numeric'];
  operator: Scalars['String'];
};

/** order by aggregate values of table "DistributionUpdated" */
export type DistributionUpdated_Aggregate_Order_By = {
  avg?: InputMaybe<DistributionUpdated_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<DistributionUpdated_Max_Order_By>;
  min?: InputMaybe<DistributionUpdated_Min_Order_By>;
  stddev?: InputMaybe<DistributionUpdated_Stddev_Order_By>;
  stddev_pop?: InputMaybe<DistributionUpdated_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<DistributionUpdated_Stddev_Samp_Order_By>;
  sum?: InputMaybe<DistributionUpdated_Sum_Order_By>;
  var_pop?: InputMaybe<DistributionUpdated_Var_Pop_Order_By>;
  var_samp?: InputMaybe<DistributionUpdated_Var_Samp_Order_By>;
  variance?: InputMaybe<DistributionUpdated_Variance_Order_By>;
};

/** order by avg() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Avg_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "DistributionUpdated". All fields are combined with a logical 'AND'. */
export type DistributionUpdated_Bool_Exp = {
  _and?: InputMaybe<Array<DistributionUpdated_Bool_Exp>>;
  _not?: InputMaybe<DistributionUpdated_Bool_Exp>;
  _or?: InputMaybe<Array<DistributionUpdated_Bool_Exp>>;
  adjustmentFlowRate?: InputMaybe<Numeric_Comparison_Exp>;
  adjustmentFlowRecipient?: InputMaybe<String_Comparison_Exp>;
  beamPool?: InputMaybe<BeamPool_Bool_Exp>;
  beamPool_id?: InputMaybe<String_Comparison_Exp>;
  distributor?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  newFlowRateFromDistributor?: InputMaybe<Numeric_Comparison_Exp>;
  newTotalDistributionFlowRate?: InputMaybe<Numeric_Comparison_Exp>;
  oldFlowRate?: InputMaybe<Numeric_Comparison_Exp>;
  operator?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Max_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentFlowRecipient?: InputMaybe<Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  distributor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
  operator?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Min_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentFlowRecipient?: InputMaybe<Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  distributor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
  operator?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "DistributionUpdated". */
export type DistributionUpdated_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  adjustmentFlowRecipient?: InputMaybe<Order_By>;
  beamPool?: InputMaybe<BeamPool_Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  distributor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
  operator?: InputMaybe<Order_By>;
};

/** select columns of table "DistributionUpdated" */
export enum DistributionUpdated_Select_Column {
  /** column name */
  AdjustmentFlowRate = 'adjustmentFlowRate',
  /** column name */
  AdjustmentFlowRecipient = 'adjustmentFlowRecipient',
  /** column name */
  BeamPoolId = 'beamPool_id',
  /** column name */
  Distributor = 'distributor',
  /** column name */
  Id = 'id',
  /** column name */
  NewFlowRateFromDistributor = 'newFlowRateFromDistributor',
  /** column name */
  NewTotalDistributionFlowRate = 'newTotalDistributionFlowRate',
  /** column name */
  OldFlowRate = 'oldFlowRate',
  /** column name */
  Operator = 'operator'
}

/** order by stddev() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Stddev_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Stddev_Pop_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Stddev_Samp_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "DistributionUpdated" */
export type DistributionUpdated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: DistributionUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DistributionUpdated_Stream_Cursor_Value_Input = {
  adjustmentFlowRate?: InputMaybe<Scalars['numeric']>;
  adjustmentFlowRecipient?: InputMaybe<Scalars['String']>;
  beamPool_id?: InputMaybe<Scalars['String']>;
  distributor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  newFlowRateFromDistributor?: InputMaybe<Scalars['numeric']>;
  newTotalDistributionFlowRate?: InputMaybe<Scalars['numeric']>;
  oldFlowRate?: InputMaybe<Scalars['numeric']>;
  operator?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Sum_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Var_Pop_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Var_Samp_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Variance_Order_By = {
  adjustmentFlowRate?: InputMaybe<Order_By>;
  newFlowRateFromDistributor?: InputMaybe<Order_By>;
  newTotalDistributionFlowRate?: InputMaybe<Order_By>;
  oldFlowRate?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "MemberUnitsUpdated" */
export type MemberUnitsUpdated = {
  __typename?: 'MemberUnitsUpdated';
  /** An object relationship */
  beam?: Maybe<Beam>;
  /** An object relationship */
  beamPool?: Maybe<BeamPool>;
  beamPool_id: Scalars['String'];
  beam_id: Scalars['String'];
  id: Scalars['String'];
  member: Scalars['String'];
  newUnits: Scalars['numeric'];
  oldUnits: Scalars['numeric'];
};

/** order by aggregate values of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Aggregate_Order_By = {
  avg?: InputMaybe<MemberUnitsUpdated_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<MemberUnitsUpdated_Max_Order_By>;
  min?: InputMaybe<MemberUnitsUpdated_Min_Order_By>;
  stddev?: InputMaybe<MemberUnitsUpdated_Stddev_Order_By>;
  stddev_pop?: InputMaybe<MemberUnitsUpdated_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<MemberUnitsUpdated_Stddev_Samp_Order_By>;
  sum?: InputMaybe<MemberUnitsUpdated_Sum_Order_By>;
  var_pop?: InputMaybe<MemberUnitsUpdated_Var_Pop_Order_By>;
  var_samp?: InputMaybe<MemberUnitsUpdated_Var_Samp_Order_By>;
  variance?: InputMaybe<MemberUnitsUpdated_Variance_Order_By>;
};

/** order by avg() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Avg_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "MemberUnitsUpdated". All fields are combined with a logical 'AND'. */
export type MemberUnitsUpdated_Bool_Exp = {
  _and?: InputMaybe<Array<MemberUnitsUpdated_Bool_Exp>>;
  _not?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  _or?: InputMaybe<Array<MemberUnitsUpdated_Bool_Exp>>;
  beam?: InputMaybe<Beam_Bool_Exp>;
  beamPool?: InputMaybe<BeamPool_Bool_Exp>;
  beamPool_id?: InputMaybe<String_Comparison_Exp>;
  beam_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  member?: InputMaybe<String_Comparison_Exp>;
  newUnits?: InputMaybe<Numeric_Comparison_Exp>;
  oldUnits?: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Max_Order_By = {
  beamPool_id?: InputMaybe<Order_By>;
  beam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Order_By>;
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Min_Order_By = {
  beamPool_id?: InputMaybe<Order_By>;
  beam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Order_By>;
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "MemberUnitsUpdated". */
export type MemberUnitsUpdated_Order_By = {
  beam?: InputMaybe<Beam_Order_By>;
  beamPool?: InputMaybe<BeamPool_Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  beam_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  member?: InputMaybe<Order_By>;
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** select columns of table "MemberUnitsUpdated" */
export enum MemberUnitsUpdated_Select_Column {
  /** column name */
  BeamPoolId = 'beamPool_id',
  /** column name */
  BeamId = 'beam_id',
  /** column name */
  Id = 'id',
  /** column name */
  Member = 'member',
  /** column name */
  NewUnits = 'newUnits',
  /** column name */
  OldUnits = 'oldUnits'
}

/** order by stddev() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stddev_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stddev_Pop_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stddev_Samp_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: MemberUnitsUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MemberUnitsUpdated_Stream_Cursor_Value_Input = {
  beamPool_id?: InputMaybe<Scalars['String']>;
  beam_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  member?: InputMaybe<Scalars['String']>;
  newUnits?: InputMaybe<Scalars['numeric']>;
  oldUnits?: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Sum_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Var_Pop_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Var_Samp_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Variance_Order_By = {
  newUnits?: InputMaybe<Order_By>;
  oldUnits?: InputMaybe<Order_By>;
};

/** columns and relationships of "PoolMetadata" */
export type PoolMetadata = {
  __typename?: 'PoolMetadata';
  castHash?: Maybe<Scalars['String']>;
  creatorFID: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instructions?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  poolType: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "PoolMetadata". All fields are combined with a logical 'AND'. */
export type PoolMetadata_Bool_Exp = {
  _and?: InputMaybe<Array<PoolMetadata_Bool_Exp>>;
  _not?: InputMaybe<PoolMetadata_Bool_Exp>;
  _or?: InputMaybe<Array<PoolMetadata_Bool_Exp>>;
  castHash?: InputMaybe<String_Comparison_Exp>;
  creatorFID?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  instructions?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  poolType?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "PoolMetadata". */
export type PoolMetadata_Order_By = {
  castHash?: InputMaybe<Order_By>;
  creatorFID?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  instructions?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  poolType?: InputMaybe<Order_By>;
};

/** select columns of table "PoolMetadata" */
export enum PoolMetadata_Select_Column {
  /** column name */
  CastHash = 'castHash',
  /** column name */
  CreatorFid = 'creatorFID',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Instructions = 'instructions',
  /** column name */
  Name = 'name',
  /** column name */
  PoolType = 'poolType'
}

/** Streaming cursor of the table "PoolMetadata" */
export type PoolMetadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: PoolMetadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolMetadata_Stream_Cursor_Value_Input = {
  castHash?: InputMaybe<Scalars['String']>;
  creatorFID?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  instructions?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  poolType?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "Profile" */
export type Profile = {
  __typename?: 'Profile';
  display_name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  pfp_url?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  _and?: InputMaybe<Array<Profile_Bool_Exp>>;
  _not?: InputMaybe<Profile_Bool_Exp>;
  _or?: InputMaybe<Array<Profile_Bool_Exp>>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  pfp_url?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Profile". */
export type Profile_Order_By = {
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pfp_url?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "Profile" */
export enum Profile_Select_Column {
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  PfpUrl = 'pfp_url',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Username = 'username'
}

/** Streaming cursor of the table "Profile" */
export type Profile_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Profile_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Profile_Stream_Cursor_Value_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  pfp_url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Role" */
export type Role = {
  __typename?: 'Role';
  admins: Array<Scalars['String']>;
  /** An object relationship */
  beamPool?: Maybe<BeamPool>;
  beamPool_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  beamR?: Maybe<BeamrGlobal>;
  beamR_id: Scalars['String'];
  chainId: Scalars['Int'];
  id: Scalars['String'];
  roleHash: Scalars['String'];
};

/** Boolean expression to filter rows from the table "Role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  admins?: InputMaybe<String_Array_Comparison_Exp>;
  beamPool?: InputMaybe<BeamPool_Bool_Exp>;
  beamPool_id?: InputMaybe<String_Comparison_Exp>;
  beamR?: InputMaybe<BeamrGlobal_Bool_Exp>;
  beamR_id?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  roleHash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Role". */
export type Role_Order_By = {
  admins?: InputMaybe<Order_By>;
  beamPool?: InputMaybe<BeamPool_Order_By>;
  beamPool_id?: InputMaybe<Order_By>;
  beamR?: InputMaybe<BeamrGlobal_Order_By>;
  beamR_id?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  roleHash?: InputMaybe<Order_By>;
};

/** select columns of table "Role" */
export enum Role_Select_Column {
  /** column name */
  Admins = 'admins',
  /** column name */
  BeamPoolId = 'beamPool_id',
  /** column name */
  BeamRId = 'beamR_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id',
  /** column name */
  RoleHash = 'roleHash'
}

/** Streaming cursor of the table "Role" */
export type Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Stream_Cursor_Value_Input = {
  admins?: InputMaybe<Array<Scalars['String']>>;
  beamPool_id?: InputMaybe<Scalars['String']>;
  beamR_id?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  roleHash?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']>>;
  _eq?: InputMaybe<Array<Scalars['String']>>;
  _gt?: InputMaybe<Array<Scalars['String']>>;
  _gte?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Array<Scalars['String']>>;
  _lte?: InputMaybe<Array<Scalars['String']>>;
  _neq?: InputMaybe<Array<Scalars['String']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "TX" */
export type Tx = {
  __typename?: 'TX';
  block: Scalars['Int'];
  chainId: Scalars['Int'];
  from: Scalars['String'];
  hash: Scalars['String'];
  id: Scalars['String'];
  timestamp: Scalars['Int'];
};

/** Boolean expression to filter rows from the table "TX". All fields are combined with a logical 'AND'. */
export type Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Tx_Bool_Exp>>;
  _not?: InputMaybe<Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Tx_Bool_Exp>>;
  block?: InputMaybe<Int_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "TX". */
export type Tx_Order_By = {
  block?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "TX" */
export enum Tx_Select_Column {
  /** column name */
  Block = 'block',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  From = 'from',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp'
}

/** Streaming cursor of the table "TX" */
export type Tx_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tx_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tx_Stream_Cursor_Value_Input = {
  block?: InputMaybe<Scalars['Int']>;
  chainId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "TokenMetric" */
export type TokenMetric = {
  __typename?: 'TokenMetric';
  address: Scalars['String'];
  amountBeamed: Scalars['numeric'];
  chainId: Scalars['Int'];
  id: Scalars['String'];
  /** An object relationship */
  vanityMetrics?: Maybe<VanityMetrics>;
  vanityMetrics_id: Scalars['String'];
};

/** order by aggregate values of table "TokenMetric" */
export type TokenMetric_Aggregate_Order_By = {
  avg?: InputMaybe<TokenMetric_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<TokenMetric_Max_Order_By>;
  min?: InputMaybe<TokenMetric_Min_Order_By>;
  stddev?: InputMaybe<TokenMetric_Stddev_Order_By>;
  stddev_pop?: InputMaybe<TokenMetric_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<TokenMetric_Stddev_Samp_Order_By>;
  sum?: InputMaybe<TokenMetric_Sum_Order_By>;
  var_pop?: InputMaybe<TokenMetric_Var_Pop_Order_By>;
  var_samp?: InputMaybe<TokenMetric_Var_Samp_Order_By>;
  variance?: InputMaybe<TokenMetric_Variance_Order_By>;
};

/** order by avg() on columns of table "TokenMetric" */
export type TokenMetric_Avg_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "TokenMetric". All fields are combined with a logical 'AND'. */
export type TokenMetric_Bool_Exp = {
  _and?: InputMaybe<Array<TokenMetric_Bool_Exp>>;
  _not?: InputMaybe<TokenMetric_Bool_Exp>;
  _or?: InputMaybe<Array<TokenMetric_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  amountBeamed?: InputMaybe<Numeric_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  vanityMetrics?: InputMaybe<VanityMetrics_Bool_Exp>;
  vanityMetrics_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "TokenMetric" */
export type TokenMetric_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vanityMetrics_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "TokenMetric" */
export type TokenMetric_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vanityMetrics_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "TokenMetric". */
export type TokenMetric_Order_By = {
  address?: InputMaybe<Order_By>;
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  vanityMetrics?: InputMaybe<VanityMetrics_Order_By>;
  vanityMetrics_id?: InputMaybe<Order_By>;
};

/** select columns of table "TokenMetric" */
export enum TokenMetric_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AmountBeamed = 'amountBeamed',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id',
  /** column name */
  VanityMetricsId = 'vanityMetrics_id'
}

/** order by stddev() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Pop_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Samp_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "TokenMetric" */
export type TokenMetric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: TokenMetric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TokenMetric_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  amountBeamed?: InputMaybe<Scalars['numeric']>;
  chainId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  vanityMetrics_id?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "TokenMetric" */
export type TokenMetric_Sum_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "TokenMetric" */
export type TokenMetric_Var_Pop_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "TokenMetric" */
export type TokenMetric_Var_Samp_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "TokenMetric" */
export type TokenMetric_Variance_Order_By = {
  amountBeamed?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
};

/** columns and relationships of "User" */
export type User = {
  __typename?: 'User';
  /** An array relationship */
  accounts: Array<UserAccount>;
  fid: Scalars['Int'];
  id: Scalars['String'];
  /** An array relationship */
  incoming: Array<Beam>;
  /** An array relationship */
  outgoing: Array<Beam>;
  /** An array relationship */
  pools: Array<BeamPool>;
  /** An object relationship */
  profile?: Maybe<Profile>;
  profile_id?: Maybe<Scalars['String']>;
};


/** columns and relationships of "User" */
export type UserAccountsArgs = {
  distinct_on?: InputMaybe<Array<UserAccount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserAccount_Order_By>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserIncomingArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserOutgoingArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserPoolsArgs = {
  distinct_on?: InputMaybe<Array<BeamPool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamPool_Order_By>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};

/** columns and relationships of "UserAccount" */
export type UserAccount = {
  __typename?: 'UserAccount';
  address: Scalars['String'];
  chainId: Scalars['Int'];
  id: Scalars['String'];
  /** An array relationship */
  pools: Array<BeamPool>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id: Scalars['String'];
};


/** columns and relationships of "UserAccount" */
export type UserAccountPoolsArgs = {
  distinct_on?: InputMaybe<Array<BeamPool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamPool_Order_By>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};

/** order by aggregate values of table "UserAccount" */
export type UserAccount_Aggregate_Order_By = {
  avg?: InputMaybe<UserAccount_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<UserAccount_Max_Order_By>;
  min?: InputMaybe<UserAccount_Min_Order_By>;
  stddev?: InputMaybe<UserAccount_Stddev_Order_By>;
  stddev_pop?: InputMaybe<UserAccount_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<UserAccount_Stddev_Samp_Order_By>;
  sum?: InputMaybe<UserAccount_Sum_Order_By>;
  var_pop?: InputMaybe<UserAccount_Var_Pop_Order_By>;
  var_samp?: InputMaybe<UserAccount_Var_Samp_Order_By>;
  variance?: InputMaybe<UserAccount_Variance_Order_By>;
};

/** order by avg() on columns of table "UserAccount" */
export type UserAccount_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "UserAccount". All fields are combined with a logical 'AND'. */
export type UserAccount_Bool_Exp = {
  _and?: InputMaybe<Array<UserAccount_Bool_Exp>>;
  _not?: InputMaybe<UserAccount_Bool_Exp>;
  _or?: InputMaybe<Array<UserAccount_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  pools?: InputMaybe<BeamPool_Bool_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "UserAccount" */
export type UserAccount_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "UserAccount" */
export type UserAccount_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "UserAccount". */
export type UserAccount_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pools_aggregate?: InputMaybe<BeamPool_Aggregate_Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "UserAccount" */
export enum UserAccount_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** order by stddev() on columns of table "UserAccount" */
export type UserAccount_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "UserAccount" */
export type UserAccount_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "UserAccount" */
export type UserAccount_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "UserAccount" */
export type UserAccount_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: UserAccount_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type UserAccount_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "UserAccount" */
export type UserAccount_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "UserAccount" */
export type UserAccount_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "UserAccount" */
export type UserAccount_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "UserAccount" */
export type UserAccount_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  accounts?: InputMaybe<UserAccount_Bool_Exp>;
  fid?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  incoming?: InputMaybe<Beam_Bool_Exp>;
  outgoing?: InputMaybe<Beam_Bool_Exp>;
  pools?: InputMaybe<BeamPool_Bool_Exp>;
  profile?: InputMaybe<Profile_Bool_Exp>;
  profile_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  accounts_aggregate?: InputMaybe<UserAccount_Aggregate_Order_By>;
  fid?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  incoming_aggregate?: InputMaybe<Beam_Aggregate_Order_By>;
  outgoing_aggregate?: InputMaybe<Beam_Aggregate_Order_By>;
  pools_aggregate?: InputMaybe<BeamPool_Aggregate_Order_By>;
  profile?: InputMaybe<Profile_Order_By>;
  profile_id?: InputMaybe<Order_By>;
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileId = 'profile_id'
}

/** Streaming cursor of the table "User" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  fid?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  profile_id?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "VanityMetrics" */
export type VanityMetrics = {
  __typename?: 'VanityMetrics';
  /** An array relationship */
  TokenMetrics: Array<TokenMetric>;
  beamPools: Scalars['Int'];
  beams: Scalars['Int'];
  id: Scalars['String'];
  users: Scalars['Int'];
};


/** columns and relationships of "VanityMetrics" */
export type VanityMetricsTokenMetricsArgs = {
  distinct_on?: InputMaybe<Array<TokenMetric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TokenMetric_Order_By>>;
  where?: InputMaybe<TokenMetric_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "VanityMetrics". All fields are combined with a logical 'AND'. */
export type VanityMetrics_Bool_Exp = {
  TokenMetrics?: InputMaybe<TokenMetric_Bool_Exp>;
  _and?: InputMaybe<Array<VanityMetrics_Bool_Exp>>;
  _not?: InputMaybe<VanityMetrics_Bool_Exp>;
  _or?: InputMaybe<Array<VanityMetrics_Bool_Exp>>;
  beamPools?: InputMaybe<Int_Comparison_Exp>;
  beams?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "VanityMetrics". */
export type VanityMetrics_Order_By = {
  TokenMetrics_aggregate?: InputMaybe<TokenMetric_Aggregate_Order_By>;
  beamPools?: InputMaybe<Order_By>;
  beams?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  users?: InputMaybe<Order_By>;
};

/** select columns of table "VanityMetrics" */
export enum VanityMetrics_Select_Column {
  /** column name */
  BeamPools = 'beamPools',
  /** column name */
  Beams = 'beams',
  /** column name */
  Id = 'id',
  /** column name */
  Users = 'users'
}

/** Streaming cursor of the table "VanityMetrics" */
export type VanityMetrics_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: VanityMetrics_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type VanityMetrics_Stream_Cursor_Value_Input = {
  beamPools?: InputMaybe<Scalars['Int']>;
  beams?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "_meta" */
export type _Meta = {
  __typename?: '_meta';
  bufferBlock?: Maybe<Scalars['Int']>;
  chainId?: Maybe<Scalars['Int']>;
  endBlock?: Maybe<Scalars['Int']>;
  eventsProcessed?: Maybe<Scalars['Int']>;
  firstEventBlock?: Maybe<Scalars['Int']>;
  isReady?: Maybe<Scalars['Boolean']>;
  progressBlock?: Maybe<Scalars['Int']>;
  readyAt?: Maybe<Scalars['timestamptz']>;
  sourceBlock?: Maybe<Scalars['Int']>;
  startBlock?: Maybe<Scalars['Int']>;
};

/** Boolean expression to filter rows from the table "_meta". All fields are combined with a logical 'AND'. */
export type _Meta_Bool_Exp = {
  _and?: InputMaybe<Array<_Meta_Bool_Exp>>;
  _not?: InputMaybe<_Meta_Bool_Exp>;
  _or?: InputMaybe<Array<_Meta_Bool_Exp>>;
  bufferBlock?: InputMaybe<Int_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  endBlock?: InputMaybe<Int_Comparison_Exp>;
  eventsProcessed?: InputMaybe<Int_Comparison_Exp>;
  firstEventBlock?: InputMaybe<Int_Comparison_Exp>;
  isReady?: InputMaybe<Boolean_Comparison_Exp>;
  progressBlock?: InputMaybe<Int_Comparison_Exp>;
  readyAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  sourceBlock?: InputMaybe<Int_Comparison_Exp>;
  startBlock?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "_meta". */
export type _Meta_Order_By = {
  bufferBlock?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  endBlock?: InputMaybe<Order_By>;
  eventsProcessed?: InputMaybe<Order_By>;
  firstEventBlock?: InputMaybe<Order_By>;
  isReady?: InputMaybe<Order_By>;
  progressBlock?: InputMaybe<Order_By>;
  readyAt?: InputMaybe<Order_By>;
  sourceBlock?: InputMaybe<Order_By>;
  startBlock?: InputMaybe<Order_By>;
};

/** select columns of table "_meta" */
export enum _Meta_Select_Column {
  /** column name */
  BufferBlock = 'bufferBlock',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  EndBlock = 'endBlock',
  /** column name */
  EventsProcessed = 'eventsProcessed',
  /** column name */
  FirstEventBlock = 'firstEventBlock',
  /** column name */
  IsReady = 'isReady',
  /** column name */
  ProgressBlock = 'progressBlock',
  /** column name */
  ReadyAt = 'readyAt',
  /** column name */
  SourceBlock = 'sourceBlock',
  /** column name */
  StartBlock = 'startBlock'
}

/** Streaming cursor of the table "_meta" */
export type _Meta_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: _Meta_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type _Meta_Stream_Cursor_Value_Input = {
  bufferBlock?: InputMaybe<Scalars['Int']>;
  chainId?: InputMaybe<Scalars['Int']>;
  endBlock?: InputMaybe<Scalars['Int']>;
  eventsProcessed?: InputMaybe<Scalars['Int']>;
  firstEventBlock?: InputMaybe<Scalars['Int']>;
  isReady?: InputMaybe<Scalars['Boolean']>;
  progressBlock?: InputMaybe<Scalars['Int']>;
  readyAt?: InputMaybe<Scalars['timestamptz']>;
  sourceBlock?: InputMaybe<Scalars['Int']>;
  startBlock?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height?: Maybe<Scalars['Int']>;
  chain_id?: Maybe<Scalars['Int']>;
  end_block?: Maybe<Scalars['Int']>;
  first_event_block_number?: Maybe<Scalars['Int']>;
  is_hyper_sync?: Maybe<Scalars['Boolean']>;
  latest_fetched_block_number?: Maybe<Scalars['Int']>;
  latest_processed_block?: Maybe<Scalars['Int']>;
  num_batches_fetched?: Maybe<Scalars['Int']>;
  num_events_processed?: Maybe<Scalars['Int']>;
  start_block?: Maybe<Scalars['Int']>;
  timestamp_caught_up_to_head_or_endblock?: Maybe<Scalars['timestamptz']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  end_block?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  is_hyper_sync?: InputMaybe<Boolean_Comparison_Exp>;
  latest_fetched_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_batches_fetched?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  end_block?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  is_hyper_sync?: InputMaybe<Order_By>;
  latest_fetched_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_batches_fetched?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export enum Chain_Metadata_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EndBlock = 'end_block',
  /** column name */
  FirstEventBlockNumber = 'first_event_block_number',
  /** column name */
  IsHyperSync = 'is_hyper_sync',
  /** column name */
  LatestFetchedBlockNumber = 'latest_fetched_block_number',
  /** column name */
  LatestProcessedBlock = 'latest_processed_block',
  /** column name */
  NumBatchesFetched = 'num_batches_fetched',
  /** column name */
  NumEventsProcessed = 'num_events_processed',
  /** column name */
  StartBlock = 'start_block',
  /** column name */
  TimestampCaughtUpToHeadOrEndblock = 'timestamp_caught_up_to_head_or_endblock'
}

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  end_block?: InputMaybe<Scalars['Int']>;
  first_event_block_number?: InputMaybe<Scalars['Int']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']>;
  latest_processed_block?: InputMaybe<Scalars['Int']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']>;
  num_events_processed?: InputMaybe<Scalars['Int']>;
  start_block?: InputMaybe<Scalars['Int']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Beam" */
  Beam: Array<Beam>;
  /** fetch data from the table: "BeamPool" */
  BeamPool: Array<BeamPool>;
  /** fetch data from the table: "BeamPool" using primary key columns */
  BeamPool_by_pk?: Maybe<BeamPool>;
  /** fetch data from the table: "BeamR_Initialized" */
  BeamR_Initialized: Array<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_Initialized" using primary key columns */
  BeamR_Initialized_by_pk?: Maybe<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_PoolCreated" */
  BeamR_PoolCreated: Array<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolCreated" using primary key columns */
  BeamR_PoolCreated_by_pk?: Maybe<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" */
  BeamR_PoolMetadataUpdated: Array<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" using primary key columns */
  BeamR_PoolMetadataUpdated_by_pk?: Maybe<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" */
  BeamR_RoleAdminChanged: Array<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" using primary key columns */
  BeamR_RoleAdminChanged_by_pk?: Maybe<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleGranted" */
  BeamR_RoleGranted: Array<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleGranted" using primary key columns */
  BeamR_RoleGranted_by_pk?: Maybe<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleRevoked" */
  BeamR_RoleRevoked: Array<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR_RoleRevoked" using primary key columns */
  BeamR_RoleRevoked_by_pk?: Maybe<BeamR_RoleRevoked>;
  /** fetch data from the table: "Beam" using primary key columns */
  Beam_by_pk?: Maybe<Beam>;
  /** fetch data from the table: "BeamrGlobal" */
  BeamrGlobal: Array<BeamrGlobal>;
  /** fetch data from the table: "BeamrGlobal" using primary key columns */
  BeamrGlobal_by_pk?: Maybe<BeamrGlobal>;
  /** fetch data from the table: "DistributionUpdated" */
  DistributionUpdated: Array<DistributionUpdated>;
  /** fetch data from the table: "DistributionUpdated" using primary key columns */
  DistributionUpdated_by_pk?: Maybe<DistributionUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" */
  MemberUnitsUpdated: Array<MemberUnitsUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" using primary key columns */
  MemberUnitsUpdated_by_pk?: Maybe<MemberUnitsUpdated>;
  /** fetch data from the table: "PoolMetadata" */
  PoolMetadata: Array<PoolMetadata>;
  /** fetch data from the table: "PoolMetadata" using primary key columns */
  PoolMetadata_by_pk?: Maybe<PoolMetadata>;
  /** fetch data from the table: "Profile" */
  Profile: Array<Profile>;
  /** fetch data from the table: "Profile" using primary key columns */
  Profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "Role" */
  Role: Array<Role>;
  /** fetch data from the table: "Role" using primary key columns */
  Role_by_pk?: Maybe<Role>;
  /** fetch data from the table: "TX" */
  TX: Array<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  TX_by_pk?: Maybe<Tx>;
  /** fetch data from the table: "TokenMetric" */
  TokenMetric: Array<TokenMetric>;
  /** fetch data from the table: "TokenMetric" using primary key columns */
  TokenMetric_by_pk?: Maybe<TokenMetric>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "UserAccount" */
  UserAccount: Array<UserAccount>;
  /** fetch data from the table: "UserAccount" using primary key columns */
  UserAccount_by_pk?: Maybe<UserAccount>;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table: "VanityMetrics" */
  VanityMetrics: Array<VanityMetrics>;
  /** fetch data from the table: "VanityMetrics" using primary key columns */
  VanityMetrics_by_pk?: Maybe<VanityMetrics>;
  /** fetch data from the table: "_meta" */
  _meta: Array<_Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
};


export type Query_RootBeamArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


export type Query_RootBeamPoolArgs = {
  distinct_on?: InputMaybe<Array<BeamPool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamPool_Order_By>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};


export type Query_RootBeamPool_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_InitializedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_Initialized_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_Initialized_Order_By>>;
  where?: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Query_RootBeamR_Initialized_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_PoolCreatedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_PoolCreated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_PoolCreated_Order_By>>;
  where?: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Query_RootBeamR_PoolCreated_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_PoolMetadataUpdatedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Order_By>>;
  where?: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Query_RootBeamR_PoolMetadataUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_RoleAdminChangedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleAdminChanged_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleAdminChanged_Order_By>>;
  where?: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Query_RootBeamR_RoleAdminChanged_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_RoleGrantedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleGranted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleGranted_Order_By>>;
  where?: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Query_RootBeamR_RoleGranted_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamR_RoleRevokedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleRevoked_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleRevoked_Order_By>>;
  where?: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Query_RootBeamR_RoleRevoked_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeam_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootBeamrGlobalArgs = {
  distinct_on?: InputMaybe<Array<BeamrGlobal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamrGlobal_Order_By>>;
  where?: InputMaybe<BeamrGlobal_Bool_Exp>;
};


export type Query_RootBeamrGlobal_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootDistributionUpdatedArgs = {
  distinct_on?: InputMaybe<Array<DistributionUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DistributionUpdated_Order_By>>;
  where?: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Query_RootDistributionUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootMemberUnitsUpdatedArgs = {
  distinct_on?: InputMaybe<Array<MemberUnitsUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MemberUnitsUpdated_Order_By>>;
  where?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Query_RootMemberUnitsUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootPoolMetadataArgs = {
  distinct_on?: InputMaybe<Array<PoolMetadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PoolMetadata_Order_By>>;
  where?: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Query_RootPoolMetadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Query_RootProfile_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootTxArgs = {
  distinct_on?: InputMaybe<Array<Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tx_Order_By>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Query_RootTx_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootTokenMetricArgs = {
  distinct_on?: InputMaybe<Array<TokenMetric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TokenMetric_Order_By>>;
  where?: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Query_RootTokenMetric_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUserAccountArgs = {
  distinct_on?: InputMaybe<Array<UserAccount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserAccount_Order_By>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Query_RootUserAccount_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootVanityMetricsArgs = {
  distinct_on?: InputMaybe<Array<VanityMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VanityMetrics_Order_By>>;
  where?: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Query_RootVanityMetrics_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_Root_MetaArgs = {
  distinct_on?: InputMaybe<Array<_Meta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<_Meta_Order_By>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  __typename?: 'raw_events';
  block_fields: Scalars['jsonb'];
  block_hash: Scalars['String'];
  block_number: Scalars['Int'];
  block_timestamp: Scalars['Int'];
  chain_id: Scalars['Int'];
  contract_name: Scalars['String'];
  event_id: Scalars['numeric'];
  event_name: Scalars['String'];
  log_index: Scalars['Int'];
  params: Scalars['jsonb'];
  serial: Scalars['Int'];
  src_address: Scalars['String'];
  transaction_fields: Scalars['jsonb'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsBlock_FieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsTransaction_FieldsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_name?: InputMaybe<String_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  serial?: InputMaybe<Int_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_fields?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_fields?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  contract_name?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_fields?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export enum Raw_Events_Select_Column {
  /** column name */
  BlockFields = 'block_fields',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractName = 'contract_name',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventName = 'event_name',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  Serial = 'serial',
  /** column name */
  SrcAddress = 'src_address',
  /** column name */
  TransactionFields = 'transaction_fields'
}

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_fields?: InputMaybe<Scalars['jsonb']>;
  block_hash?: InputMaybe<Scalars['String']>;
  block_number?: InputMaybe<Scalars['Int']>;
  block_timestamp?: InputMaybe<Scalars['Int']>;
  chain_id?: InputMaybe<Scalars['Int']>;
  contract_name?: InputMaybe<Scalars['String']>;
  event_id?: InputMaybe<Scalars['numeric']>;
  event_name?: InputMaybe<Scalars['String']>;
  log_index?: InputMaybe<Scalars['Int']>;
  params?: InputMaybe<Scalars['jsonb']>;
  serial?: InputMaybe<Scalars['Int']>;
  src_address?: InputMaybe<Scalars['String']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Beam" */
  Beam: Array<Beam>;
  /** fetch data from the table: "BeamPool" */
  BeamPool: Array<BeamPool>;
  /** fetch data from the table: "BeamPool" using primary key columns */
  BeamPool_by_pk?: Maybe<BeamPool>;
  /** fetch data from the table in a streaming manner: "BeamPool" */
  BeamPool_stream: Array<BeamPool>;
  /** fetch data from the table: "BeamR_Initialized" */
  BeamR_Initialized: Array<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_Initialized" using primary key columns */
  BeamR_Initialized_by_pk?: Maybe<BeamR_Initialized>;
  /** fetch data from the table in a streaming manner: "BeamR_Initialized" */
  BeamR_Initialized_stream: Array<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_PoolCreated" */
  BeamR_PoolCreated: Array<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolCreated" using primary key columns */
  BeamR_PoolCreated_by_pk?: Maybe<BeamR_PoolCreated>;
  /** fetch data from the table in a streaming manner: "BeamR_PoolCreated" */
  BeamR_PoolCreated_stream: Array<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" */
  BeamR_PoolMetadataUpdated: Array<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" using primary key columns */
  BeamR_PoolMetadataUpdated_by_pk?: Maybe<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table in a streaming manner: "BeamR_PoolMetadataUpdated" */
  BeamR_PoolMetadataUpdated_stream: Array<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" */
  BeamR_RoleAdminChanged: Array<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" using primary key columns */
  BeamR_RoleAdminChanged_by_pk?: Maybe<BeamR_RoleAdminChanged>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleAdminChanged" */
  BeamR_RoleAdminChanged_stream: Array<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleGranted" */
  BeamR_RoleGranted: Array<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleGranted" using primary key columns */
  BeamR_RoleGranted_by_pk?: Maybe<BeamR_RoleGranted>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleGranted" */
  BeamR_RoleGranted_stream: Array<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleRevoked" */
  BeamR_RoleRevoked: Array<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR_RoleRevoked" using primary key columns */
  BeamR_RoleRevoked_by_pk?: Maybe<BeamR_RoleRevoked>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleRevoked" */
  BeamR_RoleRevoked_stream: Array<BeamR_RoleRevoked>;
  /** fetch data from the table: "Beam" using primary key columns */
  Beam_by_pk?: Maybe<Beam>;
  /** fetch data from the table in a streaming manner: "Beam" */
  Beam_stream: Array<Beam>;
  /** fetch data from the table: "BeamrGlobal" */
  BeamrGlobal: Array<BeamrGlobal>;
  /** fetch data from the table: "BeamrGlobal" using primary key columns */
  BeamrGlobal_by_pk?: Maybe<BeamrGlobal>;
  /** fetch data from the table in a streaming manner: "BeamrGlobal" */
  BeamrGlobal_stream: Array<BeamrGlobal>;
  /** fetch data from the table: "DistributionUpdated" */
  DistributionUpdated: Array<DistributionUpdated>;
  /** fetch data from the table: "DistributionUpdated" using primary key columns */
  DistributionUpdated_by_pk?: Maybe<DistributionUpdated>;
  /** fetch data from the table in a streaming manner: "DistributionUpdated" */
  DistributionUpdated_stream: Array<DistributionUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" */
  MemberUnitsUpdated: Array<MemberUnitsUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" using primary key columns */
  MemberUnitsUpdated_by_pk?: Maybe<MemberUnitsUpdated>;
  /** fetch data from the table in a streaming manner: "MemberUnitsUpdated" */
  MemberUnitsUpdated_stream: Array<MemberUnitsUpdated>;
  /** fetch data from the table: "PoolMetadata" */
  PoolMetadata: Array<PoolMetadata>;
  /** fetch data from the table: "PoolMetadata" using primary key columns */
  PoolMetadata_by_pk?: Maybe<PoolMetadata>;
  /** fetch data from the table in a streaming manner: "PoolMetadata" */
  PoolMetadata_stream: Array<PoolMetadata>;
  /** fetch data from the table: "Profile" */
  Profile: Array<Profile>;
  /** fetch data from the table: "Profile" using primary key columns */
  Profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table in a streaming manner: "Profile" */
  Profile_stream: Array<Profile>;
  /** fetch data from the table: "Role" */
  Role: Array<Role>;
  /** fetch data from the table: "Role" using primary key columns */
  Role_by_pk?: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "Role" */
  Role_stream: Array<Role>;
  /** fetch data from the table: "TX" */
  TX: Array<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  TX_by_pk?: Maybe<Tx>;
  /** fetch data from the table in a streaming manner: "TX" */
  TX_stream: Array<Tx>;
  /** fetch data from the table: "TokenMetric" */
  TokenMetric: Array<TokenMetric>;
  /** fetch data from the table: "TokenMetric" using primary key columns */
  TokenMetric_by_pk?: Maybe<TokenMetric>;
  /** fetch data from the table in a streaming manner: "TokenMetric" */
  TokenMetric_stream: Array<TokenMetric>;
  /** fetch data from the table: "User" */
  User: Array<User>;
  /** fetch data from the table: "UserAccount" */
  UserAccount: Array<UserAccount>;
  /** fetch data from the table: "UserAccount" using primary key columns */
  UserAccount_by_pk?: Maybe<UserAccount>;
  /** fetch data from the table in a streaming manner: "UserAccount" */
  UserAccount_stream: Array<UserAccount>;
  /** fetch data from the table: "User" using primary key columns */
  User_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "User" */
  User_stream: Array<User>;
  /** fetch data from the table: "VanityMetrics" */
  VanityMetrics: Array<VanityMetrics>;
  /** fetch data from the table: "VanityMetrics" using primary key columns */
  VanityMetrics_by_pk?: Maybe<VanityMetrics>;
  /** fetch data from the table in a streaming manner: "VanityMetrics" */
  VanityMetrics_stream: Array<VanityMetrics>;
  /** fetch data from the table: "_meta" */
  _meta: Array<_Meta>;
  /** fetch data from the table in a streaming manner: "_meta" */
  _meta_stream: Array<_Meta>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<Raw_Events>;
};


export type Subscription_RootBeamArgs = {
  distinct_on?: InputMaybe<Array<Beam_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Beam_Order_By>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


export type Subscription_RootBeamPoolArgs = {
  distinct_on?: InputMaybe<Array<BeamPool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamPool_Order_By>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};


export type Subscription_RootBeamPool_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamPool_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamPool_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamPool_Bool_Exp>;
};


export type Subscription_RootBeamR_InitializedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_Initialized_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_Initialized_Order_By>>;
  where?: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Subscription_RootBeamR_Initialized_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_Initialized_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_Initialized_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolCreatedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_PoolCreated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_PoolCreated_Order_By>>;
  where?: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolCreated_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_PoolCreated_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_PoolCreated_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolMetadataUpdatedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_PoolMetadataUpdated_Order_By>>;
  where?: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolMetadataUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_PoolMetadataUpdated_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_PoolMetadataUpdated_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleAdminChangedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleAdminChanged_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleAdminChanged_Order_By>>;
  where?: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleAdminChanged_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_RoleAdminChanged_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_RoleAdminChanged_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleGrantedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleGranted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleGranted_Order_By>>;
  where?: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleGranted_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_RoleGranted_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_RoleGranted_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleRevokedArgs = {
  distinct_on?: InputMaybe<Array<BeamR_RoleRevoked_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamR_RoleRevoked_Order_By>>;
  where?: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleRevoked_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamR_RoleRevoked_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamR_RoleRevoked_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Subscription_RootBeam_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeam_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Beam_Stream_Cursor_Input>>;
  where?: InputMaybe<Beam_Bool_Exp>;
};


export type Subscription_RootBeamrGlobalArgs = {
  distinct_on?: InputMaybe<Array<BeamrGlobal_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BeamrGlobal_Order_By>>;
  where?: InputMaybe<BeamrGlobal_Bool_Exp>;
};


export type Subscription_RootBeamrGlobal_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBeamrGlobal_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BeamrGlobal_Stream_Cursor_Input>>;
  where?: InputMaybe<BeamrGlobal_Bool_Exp>;
};


export type Subscription_RootDistributionUpdatedArgs = {
  distinct_on?: InputMaybe<Array<DistributionUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<DistributionUpdated_Order_By>>;
  where?: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Subscription_RootDistributionUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootDistributionUpdated_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<DistributionUpdated_Stream_Cursor_Input>>;
  where?: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Subscription_RootMemberUnitsUpdatedArgs = {
  distinct_on?: InputMaybe<Array<MemberUnitsUpdated_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<MemberUnitsUpdated_Order_By>>;
  where?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Subscription_RootMemberUnitsUpdated_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootMemberUnitsUpdated_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<MemberUnitsUpdated_Stream_Cursor_Input>>;
  where?: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Subscription_RootPoolMetadataArgs = {
  distinct_on?: InputMaybe<Array<PoolMetadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PoolMetadata_Order_By>>;
  where?: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Subscription_RootPoolMetadata_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootPoolMetadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<PoolMetadata_Stream_Cursor_Input>>;
  where?: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Subscription_RootProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Subscription_RootProfile_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootProfile_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Profile_Stream_Cursor_Input>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


export type Subscription_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Role_Stream_Cursor_Input>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootTxArgs = {
  distinct_on?: InputMaybe<Array<Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tx_Order_By>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootTx_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootTx_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Tx_Stream_Cursor_Input>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootTokenMetricArgs = {
  distinct_on?: InputMaybe<Array<TokenMetric_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<TokenMetric_Order_By>>;
  where?: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Subscription_RootTokenMetric_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootTokenMetric_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<TokenMetric_Stream_Cursor_Input>>;
  where?: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUserAccountArgs = {
  distinct_on?: InputMaybe<Array<UserAccount_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserAccount_Order_By>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Subscription_RootUserAccount_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootUserAccount_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<UserAccount_Stream_Cursor_Input>>;
  where?: InputMaybe<UserAccount_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootVanityMetricsArgs = {
  distinct_on?: InputMaybe<Array<VanityMetrics_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<VanityMetrics_Order_By>>;
  where?: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Subscription_RootVanityMetrics_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootVanityMetrics_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<VanityMetrics_Stream_Cursor_Input>>;
  where?: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Subscription_Root_MetaArgs = {
  distinct_on?: InputMaybe<Array<_Meta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<_Meta_Order_By>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Subscription_Root_Meta_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<_Meta_Stream_Cursor_Input>>;
  where?: InputMaybe<_Meta_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type GlobalMostRecentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GlobalMostRecentSubscription = { __typename?: 'subscription_root', Beam: Array<{ __typename?: 'Beam', id: string, units: any, lastUpdated: number, beamPool?: { __typename?: 'BeamPool', flowRate: any, totalUnits: any } | null, from?: { __typename?: 'User', fid: number, id: string, profile?: { __typename?: 'Profile', id: string, pfp_url?: string | null, display_name?: string | null, username?: string | null } | null } | null, to?: { __typename?: 'User', fid: number, id: string, profile?: { __typename?: 'Profile', id: string, pfp_url?: string | null, display_name?: string | null, username?: string | null } | null } | null }> };

export type LoggedInUserSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type LoggedInUserSubscription = { __typename?: 'subscription_root', User_by_pk?: { __typename?: 'User', id: string, pools: Array<{ __typename?: 'BeamPool', id: string }>, incoming: Array<{ __typename?: 'Beam', id: string, units: any, lastUpdated: number, beamPool?: { __typename?: 'BeamPool', flowRate: any, totalUnits: any } | null, from?: { __typename?: 'User', fid: number, id: string, profile?: { __typename?: 'Profile', id: string, pfp_url?: string | null, display_name?: string | null, username?: string | null } | null } | null }>, outgoing: Array<{ __typename?: 'Beam', units: any, id: string, beamPool?: { __typename?: 'BeamPool', flowRate: any, totalUnits: any, id: string } | null, to?: { __typename?: 'User', id: string, fid: number, profile?: { __typename?: 'Profile', id: string, display_name?: string | null, username?: string | null, pfp_url?: string | null } | null } | null }> } | null };

export type GetTxByIdSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTxByIdSubscription = { __typename?: 'subscription_root', TX_by_pk?: { __typename?: 'TX', id: string } | null };


export const GlobalMostRecentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GlobalMostRecent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Beam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastUpdated"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"30"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"beamPool"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"units"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"beamPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flowRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pfp_url"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pfp_url"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GlobalMostRecentSubscription, GlobalMostRecentSubscriptionVariables>;
export const LoggedInUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LoggedInUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"User_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"incoming"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastUpdated"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"beamPool"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"units"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"beamPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flowRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"from"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pfp_url"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"outgoing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lastUpdated"},"value":{"kind":"EnumValue","value":"desc"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"beamPool"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"units"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"beamPool"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flowRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fid"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"pfp_url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoggedInUserSubscription, LoggedInUserSubscriptionVariables>;
export const GetTxByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GetTxById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"TX_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTxByIdSubscription, GetTxByIdSubscriptionVariables>;