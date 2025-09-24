import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  contract_type: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: string; output: string; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: string; output: string; }
};

/** columns and relationships of "Beam" */
export type Beam = {
  readonly __typename?: 'Beam';
  /** An object relationship */
  readonly beamPool: Maybe<BeamPool>;
  readonly beamPool_id: Scalars['String']['output'];
  /** An object relationship */
  readonly beamR: Maybe<BeamR>;
  readonly beamR_id: Scalars['String']['output'];
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  readonly from: Maybe<User>;
  readonly from_id: Scalars['String']['output'];
  readonly id: Scalars['String']['output'];
  readonly isReceiverConnected: Scalars['Boolean']['output'];
  /** An array relationship */
  readonly memberUnitsUpdated: ReadonlyArray<MemberUnitsUpdated>;
  /** An object relationship */
  readonly to: Maybe<User>;
  readonly to_id: Scalars['String']['output'];
  readonly units: Scalars['numeric']['output'];
};


/** columns and relationships of "Beam" */
export type BeamMemberUnitsUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Order_By>>;
  where: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};

/** columns and relationships of "BeamPool" */
export type BeamPool = {
  readonly __typename?: 'BeamPool';
  readonly adjustmentFlowRate: Scalars['numeric']['output'];
  readonly adjustmentMember: Scalars['String']['output'];
  readonly beamCount: Scalars['Int']['output'];
  /** An object relationship */
  readonly beamR: Maybe<BeamR>;
  readonly beamR_id: Scalars['String']['output'];
  /** An array relationship */
  readonly beams: ReadonlyArray<Beam>;
  readonly chainId: Scalars['Int']['output'];
  /** An object relationship */
  readonly creator: Maybe<User>;
  readonly creator_id: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  /** An array relationship */
  readonly distributionUpdates: ReadonlyArray<DistributionUpdated>;
  readonly flowRate: Scalars['numeric']['output'];
  readonly id: Scalars['String']['output'];
  /** An object relationship */
  readonly lastDistroUpdate: Maybe<DistributionUpdated>;
  readonly lastDistroUpdate_id: Maybe<Scalars['String']['output']>;
  readonly lastUpdated: Scalars['Int']['output'];
  /** An array relationship */
  readonly memberUnitsUpdated: ReadonlyArray<MemberUnitsUpdated>;
  /** An object relationship */
  readonly metadata: Maybe<PoolMetadata>;
  readonly metadata_id: Scalars['String']['output'];
  /** An object relationship */
  readonly poolAdminRole: Maybe<Role>;
  readonly poolAdminRole_id: Scalars['String']['output'];
  readonly token: Scalars['String']['output'];
  readonly totalUnits: Scalars['numeric']['output'];
};


/** columns and relationships of "BeamPool" */
export type BeamPoolBeamsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};


/** columns and relationships of "BeamPool" */
export type BeamPoolDistributionUpdatesArgs = {
  distinct_on: InputMaybe<ReadonlyArray<DistributionUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<DistributionUpdated_Order_By>>;
  where: InputMaybe<DistributionUpdated_Bool_Exp>;
};


/** columns and relationships of "BeamPool" */
export type BeamPoolMemberUnitsUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Order_By>>;
  where: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};

/** order by aggregate values of table "BeamPool" */
export type BeamPool_Aggregate_Order_By = {
  readonly avg: InputMaybe<BeamPool_Avg_Order_By>;
  readonly count: InputMaybe<Order_By>;
  readonly max: InputMaybe<BeamPool_Max_Order_By>;
  readonly min: InputMaybe<BeamPool_Min_Order_By>;
  readonly stddev: InputMaybe<BeamPool_Stddev_Order_By>;
  readonly stddev_pop: InputMaybe<BeamPool_Stddev_Pop_Order_By>;
  readonly stddev_samp: InputMaybe<BeamPool_Stddev_Samp_Order_By>;
  readonly sum: InputMaybe<BeamPool_Sum_Order_By>;
  readonly var_pop: InputMaybe<BeamPool_Var_Pop_Order_By>;
  readonly var_samp: InputMaybe<BeamPool_Var_Samp_Order_By>;
  readonly variance: InputMaybe<BeamPool_Variance_Order_By>;
};

/** order by avg() on columns of table "BeamPool" */
export type BeamPool_Avg_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BeamPool". All fields are combined with a logical 'AND'. */
export type BeamPool_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamPool_Bool_Exp>>;
  readonly _not: InputMaybe<BeamPool_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamPool_Bool_Exp>>;
  readonly adjustmentFlowRate: InputMaybe<Numeric_Comparison_Exp>;
  readonly adjustmentMember: InputMaybe<String_Comparison_Exp>;
  readonly beamCount: InputMaybe<Int_Comparison_Exp>;
  readonly beamR: InputMaybe<BeamR_Bool_Exp>;
  readonly beamR_id: InputMaybe<String_Comparison_Exp>;
  readonly beams: InputMaybe<Beam_Bool_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly creator: InputMaybe<User_Bool_Exp>;
  readonly creator_id: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly distributionUpdates: InputMaybe<DistributionUpdated_Bool_Exp>;
  readonly flowRate: InputMaybe<Numeric_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly lastDistroUpdate: InputMaybe<DistributionUpdated_Bool_Exp>;
  readonly lastDistroUpdate_id: InputMaybe<String_Comparison_Exp>;
  readonly lastUpdated: InputMaybe<Int_Comparison_Exp>;
  readonly memberUnitsUpdated: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  readonly metadata: InputMaybe<PoolMetadata_Bool_Exp>;
  readonly metadata_id: InputMaybe<String_Comparison_Exp>;
  readonly poolAdminRole: InputMaybe<Role_Bool_Exp>;
  readonly poolAdminRole_id: InputMaybe<String_Comparison_Exp>;
  readonly token: InputMaybe<String_Comparison_Exp>;
  readonly totalUnits: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "BeamPool" */
export type BeamPool_Max_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentMember: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly creator_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly lastDistroUpdate_id: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly metadata_id: InputMaybe<Order_By>;
  readonly poolAdminRole_id: InputMaybe<Order_By>;
  readonly token: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by min() on columns of table "BeamPool" */
export type BeamPool_Min_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentMember: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly creator_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly lastDistroUpdate_id: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly metadata_id: InputMaybe<Order_By>;
  readonly poolAdminRole_id: InputMaybe<Order_By>;
  readonly token: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "BeamPool". */
export type BeamPool_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentMember: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly beamR: InputMaybe<BeamR_Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly beams_aggregate: InputMaybe<Beam_Aggregate_Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly creator: InputMaybe<User_Order_By>;
  readonly creator_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly distributionUpdates_aggregate: InputMaybe<DistributionUpdated_Aggregate_Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly lastDistroUpdate: InputMaybe<DistributionUpdated_Order_By>;
  readonly lastDistroUpdate_id: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly memberUnitsUpdated_aggregate: InputMaybe<MemberUnitsUpdated_Aggregate_Order_By>;
  readonly metadata: InputMaybe<PoolMetadata_Order_By>;
  readonly metadata_id: InputMaybe<Order_By>;
  readonly poolAdminRole: InputMaybe<Role_Order_By>;
  readonly poolAdminRole_id: InputMaybe<Order_By>;
  readonly token: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** select columns of table "BeamPool" */
export enum BeamPool_Select_Column {
  /** column name */
  AdjustmentFlowRate = 'adjustmentFlowRate',
  /** column name */
  AdjustmentMember = 'adjustmentMember',
  /** column name */
  BeamCount = 'beamCount',
  /** column name */
  BeamRId = 'beamR_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "BeamPool" */
export type BeamPool_Stddev_Pop_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "BeamPool" */
export type BeamPool_Stddev_Samp_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BeamPool" */
export type BeamPool_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: BeamPool_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamPool_Stream_Cursor_Value_Input = {
  readonly adjustmentFlowRate: InputMaybe<Scalars['numeric']['input']>;
  readonly adjustmentMember: InputMaybe<Scalars['String']['input']>;
  readonly beamCount: InputMaybe<Scalars['Int']['input']>;
  readonly beamR_id: InputMaybe<Scalars['String']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly creator_id: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly flowRate: InputMaybe<Scalars['numeric']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly lastDistroUpdate_id: InputMaybe<Scalars['String']['input']>;
  readonly lastUpdated: InputMaybe<Scalars['Int']['input']>;
  readonly metadata_id: InputMaybe<Scalars['String']['input']>;
  readonly poolAdminRole_id: InputMaybe<Scalars['String']['input']>;
  readonly token: InputMaybe<Scalars['String']['input']>;
  readonly totalUnits: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "BeamPool" */
export type BeamPool_Sum_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "BeamPool" */
export type BeamPool_Var_Pop_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "BeamPool" */
export type BeamPool_Var_Samp_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "BeamPool" */
export type BeamPool_Variance_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly beamCount: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly flowRate: InputMaybe<Order_By>;
  readonly lastUpdated: InputMaybe<Order_By>;
  readonly totalUnits: InputMaybe<Order_By>;
};

/** columns and relationships of "BeamR" */
export type BeamR = {
  readonly __typename?: 'BeamR';
  /** An object relationship */
  readonly adminRole: Maybe<Role>;
  readonly adminRole_id: Scalars['String']['output'];
  /** An array relationship */
  readonly beamPools: ReadonlyArray<BeamPool>;
  /** An array relationship */
  readonly beams: ReadonlyArray<Beam>;
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  /** An object relationship */
  readonly rootAdminRole: Maybe<Role>;
  readonly rootAdminRole_id: Scalars['String']['output'];
};


/** columns and relationships of "BeamR" */
export type BeamRBeamPoolsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamPool_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamPool_Order_By>>;
  where: InputMaybe<BeamPool_Bool_Exp>;
};


/** columns and relationships of "BeamR" */
export type BeamRBeamsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};

/** columns and relationships of "BeamR_Initialized" */
export type BeamR_Initialized = {
  readonly __typename?: 'BeamR_Initialized';
  readonly adminRole: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly rootAdminRole: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_Initialized". All fields are combined with a logical 'AND'. */
export type BeamR_Initialized_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_Initialized_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_Initialized_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_Initialized_Bool_Exp>>;
  readonly adminRole: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly rootAdminRole: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_Initialized". */
export type BeamR_Initialized_Order_By = {
  readonly adminRole: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly rootAdminRole: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_Initialized" */
export enum BeamR_Initialized_Select_Column {
  /** column name */
  AdminRole = 'adminRole',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_Initialized_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_Initialized_Stream_Cursor_Value_Input = {
  readonly adminRole: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly rootAdminRole: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BeamR_PoolCreated" */
export type BeamR_PoolCreated = {
  readonly __typename?: 'BeamR_PoolCreated';
  readonly config_0: Scalars['Boolean']['output'];
  readonly config_1: Scalars['Boolean']['output'];
  readonly creator: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly metadata_0: Scalars['numeric']['output'];
  readonly metadata_1: Scalars['String']['output'];
  readonly pool: Scalars['String']['output'];
  readonly poolAdminRole: Scalars['String']['output'];
  readonly token: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_PoolCreated". All fields are combined with a logical 'AND'. */
export type BeamR_PoolCreated_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Bool_Exp>>;
  readonly config_0: InputMaybe<Boolean_Comparison_Exp>;
  readonly config_1: InputMaybe<Boolean_Comparison_Exp>;
  readonly creator: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly metadata_0: InputMaybe<Numeric_Comparison_Exp>;
  readonly metadata_1: InputMaybe<String_Comparison_Exp>;
  readonly pool: InputMaybe<String_Comparison_Exp>;
  readonly poolAdminRole: InputMaybe<String_Comparison_Exp>;
  readonly token: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_PoolCreated". */
export type BeamR_PoolCreated_Order_By = {
  readonly config_0: InputMaybe<Order_By>;
  readonly config_1: InputMaybe<Order_By>;
  readonly creator: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly metadata_0: InputMaybe<Order_By>;
  readonly metadata_1: InputMaybe<Order_By>;
  readonly pool: InputMaybe<Order_By>;
  readonly poolAdminRole: InputMaybe<Order_By>;
  readonly token: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_PoolCreated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_PoolCreated_Stream_Cursor_Value_Input = {
  readonly config_0: InputMaybe<Scalars['Boolean']['input']>;
  readonly config_1: InputMaybe<Scalars['Boolean']['input']>;
  readonly creator: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly metadata_0: InputMaybe<Scalars['numeric']['input']>;
  readonly metadata_1: InputMaybe<Scalars['String']['input']>;
  readonly pool: InputMaybe<Scalars['String']['input']>;
  readonly poolAdminRole: InputMaybe<Scalars['String']['input']>;
  readonly token: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BeamR_PoolMetadataUpdated" */
export type BeamR_PoolMetadataUpdated = {
  readonly __typename?: 'BeamR_PoolMetadataUpdated';
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly metadata_0: Scalars['numeric']['output'];
  readonly metadata_1: Scalars['String']['output'];
  readonly pool: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_PoolMetadataUpdated". All fields are combined with a logical 'AND'. */
export type BeamR_PoolMetadataUpdated_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Bool_Exp>>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly metadata_0: InputMaybe<Numeric_Comparison_Exp>;
  readonly metadata_1: InputMaybe<String_Comparison_Exp>;
  readonly pool: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_PoolMetadataUpdated". */
export type BeamR_PoolMetadataUpdated_Order_By = {
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly metadata_0: InputMaybe<Order_By>;
  readonly metadata_1: InputMaybe<Order_By>;
  readonly pool: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_PoolMetadataUpdated" */
export enum BeamR_PoolMetadataUpdated_Select_Column {
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_PoolMetadataUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_PoolMetadataUpdated_Stream_Cursor_Value_Input = {
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly metadata_0: InputMaybe<Scalars['numeric']['input']>;
  readonly metadata_1: InputMaybe<Scalars['String']['input']>;
  readonly pool: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BeamR_RoleAdminChanged" */
export type BeamR_RoleAdminChanged = {
  readonly __typename?: 'BeamR_RoleAdminChanged';
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly newAdminRole: Scalars['String']['output'];
  readonly previousAdminRole: Scalars['String']['output'];
  readonly role: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleAdminChanged". All fields are combined with a logical 'AND'. */
export type BeamR_RoleAdminChanged_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Bool_Exp>>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly newAdminRole: InputMaybe<String_Comparison_Exp>;
  readonly previousAdminRole: InputMaybe<String_Comparison_Exp>;
  readonly role: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleAdminChanged". */
export type BeamR_RoleAdminChanged_Order_By = {
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly newAdminRole: InputMaybe<Order_By>;
  readonly previousAdminRole: InputMaybe<Order_By>;
  readonly role: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleAdminChanged" */
export enum BeamR_RoleAdminChanged_Select_Column {
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_RoleAdminChanged_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleAdminChanged_Stream_Cursor_Value_Input = {
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly newAdminRole: InputMaybe<Scalars['String']['input']>;
  readonly previousAdminRole: InputMaybe<Scalars['String']['input']>;
  readonly role: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BeamR_RoleGranted" */
export type BeamR_RoleGranted = {
  readonly __typename?: 'BeamR_RoleGranted';
  readonly account: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly role: Scalars['String']['output'];
  readonly sender: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleGranted". All fields are combined with a logical 'AND'. */
export type BeamR_RoleGranted_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Bool_Exp>>;
  readonly account: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly role: InputMaybe<String_Comparison_Exp>;
  readonly sender: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleGranted". */
export type BeamR_RoleGranted_Order_By = {
  readonly account: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly role: InputMaybe<Order_By>;
  readonly sender: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleGranted" */
export enum BeamR_RoleGranted_Select_Column {
  /** column name */
  Account = 'account',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_RoleGranted_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleGranted_Stream_Cursor_Value_Input = {
  readonly account: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly role: InputMaybe<Scalars['String']['input']>;
  readonly sender: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BeamR_RoleRevoked" */
export type BeamR_RoleRevoked = {
  readonly __typename?: 'BeamR_RoleRevoked';
  readonly account: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly role: Scalars['String']['output'];
  readonly sender: Scalars['String']['output'];
  /** An object relationship */
  readonly tx: Maybe<Tx>;
  readonly tx_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "BeamR_RoleRevoked". All fields are combined with a logical 'AND'. */
export type BeamR_RoleRevoked_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Bool_Exp>>;
  readonly account: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly role: InputMaybe<String_Comparison_Exp>;
  readonly sender: InputMaybe<String_Comparison_Exp>;
  readonly tx: InputMaybe<Tx_Bool_Exp>;
  readonly tx_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR_RoleRevoked". */
export type BeamR_RoleRevoked_Order_By = {
  readonly account: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly role: InputMaybe<Order_By>;
  readonly sender: InputMaybe<Order_By>;
  readonly tx: InputMaybe<Tx_Order_By>;
  readonly tx_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR_RoleRevoked" */
export enum BeamR_RoleRevoked_Select_Column {
  /** column name */
  Account = 'account',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: BeamR_RoleRevoked_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_RoleRevoked_Stream_Cursor_Value_Input = {
  readonly account: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly role: InputMaybe<Scalars['String']['input']>;
  readonly sender: InputMaybe<Scalars['String']['input']>;
  readonly tx_id: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "BeamR". All fields are combined with a logical 'AND'. */
export type BeamR_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<BeamR_Bool_Exp>>;
  readonly _not: InputMaybe<BeamR_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<BeamR_Bool_Exp>>;
  readonly adminRole: InputMaybe<Role_Bool_Exp>;
  readonly adminRole_id: InputMaybe<String_Comparison_Exp>;
  readonly beamPools: InputMaybe<BeamPool_Bool_Exp>;
  readonly beams: InputMaybe<Beam_Bool_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly rootAdminRole: InputMaybe<Role_Bool_Exp>;
  readonly rootAdminRole_id: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BeamR". */
export type BeamR_Order_By = {
  readonly adminRole: InputMaybe<Role_Order_By>;
  readonly adminRole_id: InputMaybe<Order_By>;
  readonly beamPools_aggregate: InputMaybe<BeamPool_Aggregate_Order_By>;
  readonly beams_aggregate: InputMaybe<Beam_Aggregate_Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly rootAdminRole: InputMaybe<Role_Order_By>;
  readonly rootAdminRole_id: InputMaybe<Order_By>;
};

/** select columns of table "BeamR" */
export enum BeamR_Select_Column {
  /** column name */
  AdminRoleId = 'adminRole_id',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  RootAdminRoleId = 'rootAdminRole_id'
}

/** Streaming cursor of the table "BeamR" */
export type BeamR_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: BeamR_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BeamR_Stream_Cursor_Value_Input = {
  readonly adminRole_id: InputMaybe<Scalars['String']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly rootAdminRole_id: InputMaybe<Scalars['String']['input']>;
};

/** order by aggregate values of table "Beam" */
export type Beam_Aggregate_Order_By = {
  readonly avg: InputMaybe<Beam_Avg_Order_By>;
  readonly count: InputMaybe<Order_By>;
  readonly max: InputMaybe<Beam_Max_Order_By>;
  readonly min: InputMaybe<Beam_Min_Order_By>;
  readonly stddev: InputMaybe<Beam_Stddev_Order_By>;
  readonly stddev_pop: InputMaybe<Beam_Stddev_Pop_Order_By>;
  readonly stddev_samp: InputMaybe<Beam_Stddev_Samp_Order_By>;
  readonly sum: InputMaybe<Beam_Sum_Order_By>;
  readonly var_pop: InputMaybe<Beam_Var_Pop_Order_By>;
  readonly var_samp: InputMaybe<Beam_Var_Samp_Order_By>;
  readonly variance: InputMaybe<Beam_Variance_Order_By>;
};

/** order by avg() on columns of table "Beam" */
export type Beam_Avg_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Beam". All fields are combined with a logical 'AND'. */
export type Beam_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Beam_Bool_Exp>>;
  readonly _not: InputMaybe<Beam_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Beam_Bool_Exp>>;
  readonly beamPool: InputMaybe<BeamPool_Bool_Exp>;
  readonly beamPool_id: InputMaybe<String_Comparison_Exp>;
  readonly beamR: InputMaybe<BeamR_Bool_Exp>;
  readonly beamR_id: InputMaybe<String_Comparison_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly from: InputMaybe<User_Bool_Exp>;
  readonly from_id: InputMaybe<String_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly isReceiverConnected: InputMaybe<Boolean_Comparison_Exp>;
  readonly memberUnitsUpdated: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  readonly to: InputMaybe<User_Bool_Exp>;
  readonly to_id: InputMaybe<String_Comparison_Exp>;
  readonly units: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "Beam" */
export type Beam_Max_Order_By = {
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly from_id: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly to_id: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Beam" */
export type Beam_Min_Order_By = {
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly from_id: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly to_id: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Beam". */
export type Beam_Order_By = {
  readonly beamPool: InputMaybe<BeamPool_Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beamR: InputMaybe<BeamR_Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly from: InputMaybe<User_Order_By>;
  readonly from_id: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly isReceiverConnected: InputMaybe<Order_By>;
  readonly memberUnitsUpdated_aggregate: InputMaybe<MemberUnitsUpdated_Aggregate_Order_By>;
  readonly to: InputMaybe<User_Order_By>;
  readonly to_id: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  FromId = 'from_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsReceiverConnected = 'isReceiverConnected',
  /** column name */
  ToId = 'to_id',
  /** column name */
  Units = 'units'
}

/** order by stddev() on columns of table "Beam" */
export type Beam_Stddev_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "Beam" */
export type Beam_Stddev_Pop_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "Beam" */
export type Beam_Stddev_Samp_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Beam" */
export type Beam_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: Beam_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Beam_Stream_Cursor_Value_Input = {
  readonly beamPool_id: InputMaybe<Scalars['String']['input']>;
  readonly beamR_id: InputMaybe<Scalars['String']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly from_id: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly isReceiverConnected: InputMaybe<Scalars['Boolean']['input']>;
  readonly to_id: InputMaybe<Scalars['String']['input']>;
  readonly units: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "Beam" */
export type Beam_Sum_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "Beam" */
export type Beam_Var_Pop_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "Beam" */
export type Beam_Var_Samp_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "Beam" */
export type Beam_Variance_Order_By = {
  readonly chainId: InputMaybe<Order_By>;
  readonly units: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['Boolean']['input']>;
  readonly _gt: InputMaybe<Scalars['Boolean']['input']>;
  readonly _gte: InputMaybe<Scalars['Boolean']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['Boolean']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lte: InputMaybe<Scalars['Boolean']['input']>;
  readonly _neq: InputMaybe<Scalars['Boolean']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "DistributionUpdated" */
export type DistributionUpdated = {
  readonly __typename?: 'DistributionUpdated';
  readonly adjustmentFlowRate: Scalars['numeric']['output'];
  readonly adjustmentFlowRecipient: Scalars['String']['output'];
  /** An object relationship */
  readonly beamPool: Maybe<BeamPool>;
  readonly beamPool_id: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly distributor: Scalars['String']['output'];
  readonly id: Scalars['String']['output'];
  readonly newFlowRateFromDistributor: Scalars['numeric']['output'];
  readonly newTotalDistributionFlowRate: Scalars['numeric']['output'];
  readonly oldFlowRate: Scalars['numeric']['output'];
  readonly operator: Scalars['String']['output'];
};

/** order by aggregate values of table "DistributionUpdated" */
export type DistributionUpdated_Aggregate_Order_By = {
  readonly avg: InputMaybe<DistributionUpdated_Avg_Order_By>;
  readonly count: InputMaybe<Order_By>;
  readonly max: InputMaybe<DistributionUpdated_Max_Order_By>;
  readonly min: InputMaybe<DistributionUpdated_Min_Order_By>;
  readonly stddev: InputMaybe<DistributionUpdated_Stddev_Order_By>;
  readonly stddev_pop: InputMaybe<DistributionUpdated_Stddev_Pop_Order_By>;
  readonly stddev_samp: InputMaybe<DistributionUpdated_Stddev_Samp_Order_By>;
  readonly sum: InputMaybe<DistributionUpdated_Sum_Order_By>;
  readonly var_pop: InputMaybe<DistributionUpdated_Var_Pop_Order_By>;
  readonly var_samp: InputMaybe<DistributionUpdated_Var_Samp_Order_By>;
  readonly variance: InputMaybe<DistributionUpdated_Variance_Order_By>;
};

/** order by avg() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Avg_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "DistributionUpdated". All fields are combined with a logical 'AND'. */
export type DistributionUpdated_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<DistributionUpdated_Bool_Exp>>;
  readonly _not: InputMaybe<DistributionUpdated_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<DistributionUpdated_Bool_Exp>>;
  readonly adjustmentFlowRate: InputMaybe<Numeric_Comparison_Exp>;
  readonly adjustmentFlowRecipient: InputMaybe<String_Comparison_Exp>;
  readonly beamPool: InputMaybe<BeamPool_Bool_Exp>;
  readonly beamPool_id: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly distributor: InputMaybe<String_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly newFlowRateFromDistributor: InputMaybe<Numeric_Comparison_Exp>;
  readonly newTotalDistributionFlowRate: InputMaybe<Numeric_Comparison_Exp>;
  readonly oldFlowRate: InputMaybe<Numeric_Comparison_Exp>;
  readonly operator: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Max_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentFlowRecipient: InputMaybe<Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly distributor: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
  readonly operator: InputMaybe<Order_By>;
};

/** order by min() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Min_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentFlowRecipient: InputMaybe<Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly distributor: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
  readonly operator: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "DistributionUpdated". */
export type DistributionUpdated_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly adjustmentFlowRecipient: InputMaybe<Order_By>;
  readonly beamPool: InputMaybe<BeamPool_Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly distributor: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
  readonly operator: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Stddev_Pop_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Stddev_Samp_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "DistributionUpdated" */
export type DistributionUpdated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: DistributionUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type DistributionUpdated_Stream_Cursor_Value_Input = {
  readonly adjustmentFlowRate: InputMaybe<Scalars['numeric']['input']>;
  readonly adjustmentFlowRecipient: InputMaybe<Scalars['String']['input']>;
  readonly beamPool_id: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly distributor: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly newFlowRateFromDistributor: InputMaybe<Scalars['numeric']['input']>;
  readonly newTotalDistributionFlowRate: InputMaybe<Scalars['numeric']['input']>;
  readonly oldFlowRate: InputMaybe<Scalars['numeric']['input']>;
  readonly operator: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Sum_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Var_Pop_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Var_Samp_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "DistributionUpdated" */
export type DistributionUpdated_Variance_Order_By = {
  readonly adjustmentFlowRate: InputMaybe<Order_By>;
  readonly newFlowRateFromDistributor: InputMaybe<Order_By>;
  readonly newTotalDistributionFlowRate: InputMaybe<Order_By>;
  readonly oldFlowRate: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['Int']['input']>;
  readonly _gt: InputMaybe<Scalars['Int']['input']>;
  readonly _gte: InputMaybe<Scalars['Int']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['Int']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['Int']['input']>;
  readonly _lte: InputMaybe<Scalars['Int']['input']>;
  readonly _neq: InputMaybe<Scalars['Int']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['Int']['input']>>;
};

/** columns and relationships of "MemberUnitsUpdated" */
export type MemberUnitsUpdated = {
  readonly __typename?: 'MemberUnitsUpdated';
  /** An object relationship */
  readonly beam: Maybe<Beam>;
  /** An object relationship */
  readonly beamPool: Maybe<BeamPool>;
  readonly beamPool_id: Scalars['String']['output'];
  readonly beam_id: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly member: Scalars['String']['output'];
  readonly newUnits: Scalars['numeric']['output'];
  readonly oldUnits: Scalars['numeric']['output'];
};

/** order by aggregate values of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Aggregate_Order_By = {
  readonly avg: InputMaybe<MemberUnitsUpdated_Avg_Order_By>;
  readonly count: InputMaybe<Order_By>;
  readonly max: InputMaybe<MemberUnitsUpdated_Max_Order_By>;
  readonly min: InputMaybe<MemberUnitsUpdated_Min_Order_By>;
  readonly stddev: InputMaybe<MemberUnitsUpdated_Stddev_Order_By>;
  readonly stddev_pop: InputMaybe<MemberUnitsUpdated_Stddev_Pop_Order_By>;
  readonly stddev_samp: InputMaybe<MemberUnitsUpdated_Stddev_Samp_Order_By>;
  readonly sum: InputMaybe<MemberUnitsUpdated_Sum_Order_By>;
  readonly var_pop: InputMaybe<MemberUnitsUpdated_Var_Pop_Order_By>;
  readonly var_samp: InputMaybe<MemberUnitsUpdated_Var_Samp_Order_By>;
  readonly variance: InputMaybe<MemberUnitsUpdated_Variance_Order_By>;
};

/** order by avg() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Avg_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "MemberUnitsUpdated". All fields are combined with a logical 'AND'. */
export type MemberUnitsUpdated_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Bool_Exp>>;
  readonly _not: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Bool_Exp>>;
  readonly beam: InputMaybe<Beam_Bool_Exp>;
  readonly beamPool: InputMaybe<BeamPool_Bool_Exp>;
  readonly beamPool_id: InputMaybe<String_Comparison_Exp>;
  readonly beam_id: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly member: InputMaybe<String_Comparison_Exp>;
  readonly newUnits: InputMaybe<Numeric_Comparison_Exp>;
  readonly oldUnits: InputMaybe<Numeric_Comparison_Exp>;
};

/** order by max() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Max_Order_By = {
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beam_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly member: InputMaybe<Order_By>;
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by min() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Min_Order_By = {
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beam_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly member: InputMaybe<Order_By>;
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "MemberUnitsUpdated". */
export type MemberUnitsUpdated_Order_By = {
  readonly beam: InputMaybe<Beam_Order_By>;
  readonly beamPool: InputMaybe<BeamPool_Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beam_id: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly member: InputMaybe<Order_By>;
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** select columns of table "MemberUnitsUpdated" */
export enum MemberUnitsUpdated_Select_Column {
  /** column name */
  BeamPoolId = 'beamPool_id',
  /** column name */
  BeamId = 'beam_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stddev_Pop_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stddev_Samp_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: MemberUnitsUpdated_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type MemberUnitsUpdated_Stream_Cursor_Value_Input = {
  readonly beamPool_id: InputMaybe<Scalars['String']['input']>;
  readonly beam_id: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly member: InputMaybe<Scalars['String']['input']>;
  readonly newUnits: InputMaybe<Scalars['numeric']['input']>;
  readonly oldUnits: InputMaybe<Scalars['numeric']['input']>;
};

/** order by sum() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Sum_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Var_Pop_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Var_Samp_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "MemberUnitsUpdated" */
export type MemberUnitsUpdated_Variance_Order_By = {
  readonly newUnits: InputMaybe<Order_By>;
  readonly oldUnits: InputMaybe<Order_By>;
};

/** columns and relationships of "PoolMetadata" */
export type PoolMetadata = {
  readonly __typename?: 'PoolMetadata';
  readonly castHash: Maybe<Scalars['String']['output']>;
  readonly creatorFID: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['String']['output'];
  readonly instructions: Maybe<Scalars['String']['output']>;
  readonly name: Scalars['String']['output'];
  readonly poolType: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "PoolMetadata". All fields are combined with a logical 'AND'. */
export type PoolMetadata_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<PoolMetadata_Bool_Exp>>;
  readonly _not: InputMaybe<PoolMetadata_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<PoolMetadata_Bool_Exp>>;
  readonly castHash: InputMaybe<String_Comparison_Exp>;
  readonly creatorFID: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly description: InputMaybe<String_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly instructions: InputMaybe<String_Comparison_Exp>;
  readonly name: InputMaybe<String_Comparison_Exp>;
  readonly poolType: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "PoolMetadata". */
export type PoolMetadata_Order_By = {
  readonly castHash: InputMaybe<Order_By>;
  readonly creatorFID: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly description: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly instructions: InputMaybe<Order_By>;
  readonly name: InputMaybe<Order_By>;
  readonly poolType: InputMaybe<Order_By>;
};

/** select columns of table "PoolMetadata" */
export enum PoolMetadata_Select_Column {
  /** column name */
  CastHash = 'castHash',
  /** column name */
  CreatorFid = 'creatorFID',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: PoolMetadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type PoolMetadata_Stream_Cursor_Value_Input = {
  readonly castHash: InputMaybe<Scalars['String']['input']>;
  readonly creatorFID: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly instructions: InputMaybe<Scalars['String']['input']>;
  readonly name: InputMaybe<Scalars['String']['input']>;
  readonly poolType: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "Role" */
export type Role = {
  readonly __typename?: 'Role';
  readonly admins: ReadonlyArray<Scalars['String']['output']>;
  /** An object relationship */
  readonly beamPool: Maybe<BeamPool>;
  readonly beamPool_id: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  readonly beamR: Maybe<BeamR>;
  readonly beamR_id: Scalars['String']['output'];
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly roleHash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Role_Bool_Exp>>;
  readonly _not: InputMaybe<Role_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Role_Bool_Exp>>;
  readonly admins: InputMaybe<String_Array_Comparison_Exp>;
  readonly beamPool: InputMaybe<BeamPool_Bool_Exp>;
  readonly beamPool_id: InputMaybe<String_Comparison_Exp>;
  readonly beamR: InputMaybe<BeamR_Bool_Exp>;
  readonly beamR_id: InputMaybe<String_Comparison_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly roleHash: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Role". */
export type Role_Order_By = {
  readonly admins: InputMaybe<Order_By>;
  readonly beamPool: InputMaybe<BeamPool_Order_By>;
  readonly beamPool_id: InputMaybe<Order_By>;
  readonly beamR: InputMaybe<BeamR_Order_By>;
  readonly beamR_id: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly roleHash: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  RoleHash = 'roleHash'
}

/** Streaming cursor of the table "Role" */
export type Role_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: Role_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Role_Stream_Cursor_Value_Input = {
  readonly admins: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly beamPool_id: InputMaybe<Scalars['String']['input']>;
  readonly beamR_id: InputMaybe<Scalars['String']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly roleHash: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  readonly _contained_in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  /** does the array contain the given value */
  readonly _contains: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _eq: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _gt: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _gte: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _in: InputMaybe<ReadonlyArray<ReadonlyArray<Scalars['String']['input']>>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _lte: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _neq: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _nin: InputMaybe<ReadonlyArray<ReadonlyArray<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['String']['input']>;
  readonly _gt: InputMaybe<Scalars['String']['input']>;
  readonly _gte: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  readonly _ilike: InputMaybe<Scalars['String']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  readonly _iregex: InputMaybe<Scalars['String']['input']>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  readonly _like: InputMaybe<Scalars['String']['input']>;
  readonly _lt: InputMaybe<Scalars['String']['input']>;
  readonly _lte: InputMaybe<Scalars['String']['input']>;
  readonly _neq: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  readonly _nilike: InputMaybe<Scalars['String']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  readonly _niregex: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  readonly _nlike: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  readonly _nregex: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  readonly _nsimilar: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  readonly _regex: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  readonly _similar: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "TX" */
export type Tx = {
  readonly __typename?: 'TX';
  readonly block: Scalars['Int']['output'];
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly from: Scalars['String']['output'];
  readonly hash: Scalars['String']['output'];
  readonly id: Scalars['String']['output'];
  readonly timestamp: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "TX". All fields are combined with a logical 'AND'. */
export type Tx_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Tx_Bool_Exp>>;
  readonly _not: InputMaybe<Tx_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Tx_Bool_Exp>>;
  readonly block: InputMaybe<Int_Comparison_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly from: InputMaybe<String_Comparison_Exp>;
  readonly hash: InputMaybe<String_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly timestamp: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "TX". */
export type Tx_Order_By = {
  readonly block: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly from: InputMaybe<Order_By>;
  readonly hash: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly timestamp: InputMaybe<Order_By>;
};

/** select columns of table "TX" */
export enum Tx_Select_Column {
  /** column name */
  Block = 'block',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: Tx_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tx_Stream_Cursor_Value_Input = {
  readonly block: InputMaybe<Scalars['Int']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly from: InputMaybe<Scalars['String']['input']>;
  readonly hash: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly timestamp: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "TokenMetric" */
export type TokenMetric = {
  readonly __typename?: 'TokenMetric';
  readonly address: Scalars['String']['output'];
  readonly amountBeamed: Scalars['numeric']['output'];
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  /** An object relationship */
  readonly vanityMetrics: Maybe<VanityMetrics>;
  readonly vanityMetrics_id: Scalars['String']['output'];
};

/** order by aggregate values of table "TokenMetric" */
export type TokenMetric_Aggregate_Order_By = {
  readonly avg: InputMaybe<TokenMetric_Avg_Order_By>;
  readonly count: InputMaybe<Order_By>;
  readonly max: InputMaybe<TokenMetric_Max_Order_By>;
  readonly min: InputMaybe<TokenMetric_Min_Order_By>;
  readonly stddev: InputMaybe<TokenMetric_Stddev_Order_By>;
  readonly stddev_pop: InputMaybe<TokenMetric_Stddev_Pop_Order_By>;
  readonly stddev_samp: InputMaybe<TokenMetric_Stddev_Samp_Order_By>;
  readonly sum: InputMaybe<TokenMetric_Sum_Order_By>;
  readonly var_pop: InputMaybe<TokenMetric_Var_Pop_Order_By>;
  readonly var_samp: InputMaybe<TokenMetric_Var_Samp_Order_By>;
  readonly variance: InputMaybe<TokenMetric_Variance_Order_By>;
};

/** order by avg() on columns of table "TokenMetric" */
export type TokenMetric_Avg_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "TokenMetric". All fields are combined with a logical 'AND'. */
export type TokenMetric_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<TokenMetric_Bool_Exp>>;
  readonly _not: InputMaybe<TokenMetric_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<TokenMetric_Bool_Exp>>;
  readonly address: InputMaybe<String_Comparison_Exp>;
  readonly amountBeamed: InputMaybe<Numeric_Comparison_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly vanityMetrics: InputMaybe<VanityMetrics_Bool_Exp>;
  readonly vanityMetrics_id: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "TokenMetric" */
export type TokenMetric_Max_Order_By = {
  readonly address: InputMaybe<Order_By>;
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly vanityMetrics_id: InputMaybe<Order_By>;
};

/** order by min() on columns of table "TokenMetric" */
export type TokenMetric_Min_Order_By = {
  readonly address: InputMaybe<Order_By>;
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly vanityMetrics_id: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "TokenMetric". */
export type TokenMetric_Order_By = {
  readonly address: InputMaybe<Order_By>;
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly vanityMetrics: InputMaybe<VanityMetrics_Order_By>;
  readonly vanityMetrics_id: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  VanityMetricsId = 'vanityMetrics_id'
}

/** order by stddev() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Pop_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "TokenMetric" */
export type TokenMetric_Stddev_Samp_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "TokenMetric" */
export type TokenMetric_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: TokenMetric_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type TokenMetric_Stream_Cursor_Value_Input = {
  readonly address: InputMaybe<Scalars['String']['input']>;
  readonly amountBeamed: InputMaybe<Scalars['numeric']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly vanityMetrics_id: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "TokenMetric" */
export type TokenMetric_Sum_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "TokenMetric" */
export type TokenMetric_Var_Pop_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "TokenMetric" */
export type TokenMetric_Var_Samp_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "TokenMetric" */
export type TokenMetric_Variance_Order_By = {
  readonly amountBeamed: InputMaybe<Order_By>;
  readonly chainId: InputMaybe<Order_By>;
};

/** columns and relationships of "User" */
export type User = {
  readonly __typename?: 'User';
  readonly address: Scalars['String']['output'];
  /** An array relationship */
  readonly beamPools: ReadonlyArray<BeamPool>;
  readonly chainId: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly fid: Maybe<Scalars['Int']['output']>;
  readonly id: Scalars['String']['output'];
  /** An array relationship */
  readonly incoming: ReadonlyArray<Beam>;
  /** An array relationship */
  readonly outgoing: ReadonlyArray<Beam>;
};


/** columns and relationships of "User" */
export type UserBeamPoolsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamPool_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamPool_Order_By>>;
  where: InputMaybe<BeamPool_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserIncomingArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};


/** columns and relationships of "User" */
export type UserOutgoingArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<User_Bool_Exp>>;
  readonly _not: InputMaybe<User_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<User_Bool_Exp>>;
  readonly address: InputMaybe<String_Comparison_Exp>;
  readonly beamPools: InputMaybe<BeamPool_Bool_Exp>;
  readonly chainId: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly fid: InputMaybe<Int_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly incoming: InputMaybe<Beam_Bool_Exp>;
  readonly outgoing: InputMaybe<Beam_Bool_Exp>;
};

/** Ordering options when selecting data from "User". */
export type User_Order_By = {
  readonly address: InputMaybe<Order_By>;
  readonly beamPools_aggregate: InputMaybe<BeamPool_Aggregate_Order_By>;
  readonly chainId: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly fid: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly incoming_aggregate: InputMaybe<Beam_Aggregate_Order_By>;
  readonly outgoing_aggregate: InputMaybe<Beam_Aggregate_Order_By>;
};

/** select columns of table "User" */
export enum User_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Fid = 'fid',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "User" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  readonly address: InputMaybe<Scalars['String']['input']>;
  readonly chainId: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly fid: InputMaybe<Scalars['Int']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "VanityMetrics" */
export type VanityMetrics = {
  readonly __typename?: 'VanityMetrics';
  /** An array relationship */
  readonly TokenMetrics: ReadonlyArray<TokenMetric>;
  readonly beamPools: Scalars['Int']['output'];
  readonly beams: Scalars['Int']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly id: Scalars['String']['output'];
  readonly users: Scalars['Int']['output'];
};


/** columns and relationships of "VanityMetrics" */
export type VanityMetricsTokenMetricsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<TokenMetric_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<TokenMetric_Order_By>>;
  where: InputMaybe<TokenMetric_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "VanityMetrics". All fields are combined with a logical 'AND'. */
export type VanityMetrics_Bool_Exp = {
  readonly TokenMetrics: InputMaybe<TokenMetric_Bool_Exp>;
  readonly _and: InputMaybe<ReadonlyArray<VanityMetrics_Bool_Exp>>;
  readonly _not: InputMaybe<VanityMetrics_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<VanityMetrics_Bool_Exp>>;
  readonly beamPools: InputMaybe<Int_Comparison_Exp>;
  readonly beams: InputMaybe<Int_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly users: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "VanityMetrics". */
export type VanityMetrics_Order_By = {
  readonly TokenMetrics_aggregate: InputMaybe<TokenMetric_Aggregate_Order_By>;
  readonly beamPools: InputMaybe<Order_By>;
  readonly beams: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly users: InputMaybe<Order_By>;
};

/** select columns of table "VanityMetrics" */
export enum VanityMetrics_Select_Column {
  /** column name */
  BeamPools = 'beamPools',
  /** column name */
  Beams = 'beams',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  Users = 'users'
}

/** Streaming cursor of the table "VanityMetrics" */
export type VanityMetrics_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: VanityMetrics_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type VanityMetrics_Stream_Cursor_Value_Input = {
  readonly beamPools: InputMaybe<Scalars['Int']['input']>;
  readonly beams: InputMaybe<Scalars['Int']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly users: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  readonly __typename?: 'chain_metadata';
  readonly block_height: Scalars['Int']['output'];
  readonly chain_id: Scalars['Int']['output'];
  readonly end_block: Maybe<Scalars['Int']['output']>;
  readonly first_event_block_number: Maybe<Scalars['Int']['output']>;
  readonly is_hyper_sync: Scalars['Boolean']['output'];
  readonly latest_fetched_block_number: Scalars['Int']['output'];
  readonly latest_processed_block: Maybe<Scalars['Int']['output']>;
  readonly num_batches_fetched: Scalars['Int']['output'];
  readonly num_events_processed: Maybe<Scalars['Int']['output']>;
  readonly start_block: Scalars['Int']['output'];
  readonly timestamp_caught_up_to_head_or_endblock: Maybe<Scalars['timestamptz']['output']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Chain_Metadata_Bool_Exp>>;
  readonly _not: InputMaybe<Chain_Metadata_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Chain_Metadata_Bool_Exp>>;
  readonly block_height: InputMaybe<Int_Comparison_Exp>;
  readonly chain_id: InputMaybe<Int_Comparison_Exp>;
  readonly end_block: InputMaybe<Int_Comparison_Exp>;
  readonly first_event_block_number: InputMaybe<Int_Comparison_Exp>;
  readonly is_hyper_sync: InputMaybe<Boolean_Comparison_Exp>;
  readonly latest_fetched_block_number: InputMaybe<Int_Comparison_Exp>;
  readonly latest_processed_block: InputMaybe<Int_Comparison_Exp>;
  readonly num_batches_fetched: InputMaybe<Int_Comparison_Exp>;
  readonly num_events_processed: InputMaybe<Int_Comparison_Exp>;
  readonly start_block: InputMaybe<Int_Comparison_Exp>;
  readonly timestamp_caught_up_to_head_or_endblock: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  readonly block_height: InputMaybe<Order_By>;
  readonly chain_id: InputMaybe<Order_By>;
  readonly end_block: InputMaybe<Order_By>;
  readonly first_event_block_number: InputMaybe<Order_By>;
  readonly is_hyper_sync: InputMaybe<Order_By>;
  readonly latest_fetched_block_number: InputMaybe<Order_By>;
  readonly latest_processed_block: InputMaybe<Order_By>;
  readonly num_batches_fetched: InputMaybe<Order_By>;
  readonly num_events_processed: InputMaybe<Order_By>;
  readonly start_block: InputMaybe<Order_By>;
  readonly timestamp_caught_up_to_head_or_endblock: InputMaybe<Order_By>;
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
  readonly initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  readonly block_height: InputMaybe<Scalars['Int']['input']>;
  readonly chain_id: InputMaybe<Scalars['Int']['input']>;
  readonly end_block: InputMaybe<Scalars['Int']['input']>;
  readonly first_event_block_number: InputMaybe<Scalars['Int']['input']>;
  readonly is_hyper_sync: InputMaybe<Scalars['Boolean']['input']>;
  readonly latest_fetched_block_number: InputMaybe<Scalars['Int']['input']>;
  readonly latest_processed_block: InputMaybe<Scalars['Int']['input']>;
  readonly num_batches_fetched: InputMaybe<Scalars['Int']['input']>;
  readonly num_events_processed: InputMaybe<Scalars['Int']['input']>;
  readonly start_block: InputMaybe<Scalars['Int']['input']>;
  readonly timestamp_caught_up_to_head_or_endblock: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['contract_type']['input']>;
  readonly _gt: InputMaybe<Scalars['contract_type']['input']>;
  readonly _gte: InputMaybe<Scalars['contract_type']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['contract_type']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['contract_type']['input']>;
  readonly _lte: InputMaybe<Scalars['contract_type']['input']>;
  readonly _neq: InputMaybe<Scalars['contract_type']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dynamic_contract_registry" */
export type Dynamic_Contract_Registry = {
  readonly __typename?: 'dynamic_contract_registry';
  readonly chain_id: Scalars['Int']['output'];
  readonly contract_address: Scalars['String']['output'];
  readonly contract_type: Scalars['contract_type']['output'];
  readonly id: Scalars['String']['output'];
  readonly registering_event_block_number: Scalars['Int']['output'];
  readonly registering_event_block_timestamp: Scalars['Int']['output'];
  readonly registering_event_contract_name: Scalars['String']['output'];
  readonly registering_event_log_index: Scalars['Int']['output'];
  readonly registering_event_name: Scalars['String']['output'];
  readonly registering_event_src_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Bool_Exp>>;
  readonly _not: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Bool_Exp>>;
  readonly chain_id: InputMaybe<Int_Comparison_Exp>;
  readonly contract_address: InputMaybe<String_Comparison_Exp>;
  readonly contract_type: InputMaybe<Contract_Type_Comparison_Exp>;
  readonly id: InputMaybe<String_Comparison_Exp>;
  readonly registering_event_block_number: InputMaybe<Int_Comparison_Exp>;
  readonly registering_event_block_timestamp: InputMaybe<Int_Comparison_Exp>;
  readonly registering_event_contract_name: InputMaybe<String_Comparison_Exp>;
  readonly registering_event_log_index: InputMaybe<Int_Comparison_Exp>;
  readonly registering_event_name: InputMaybe<String_Comparison_Exp>;
  readonly registering_event_src_address: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  readonly chain_id: InputMaybe<Order_By>;
  readonly contract_address: InputMaybe<Order_By>;
  readonly contract_type: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly registering_event_block_number: InputMaybe<Order_By>;
  readonly registering_event_block_timestamp: InputMaybe<Order_By>;
  readonly registering_event_contract_name: InputMaybe<Order_By>;
  readonly registering_event_log_index: InputMaybe<Order_By>;
  readonly registering_event_name: InputMaybe<Order_By>;
  readonly registering_event_src_address: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export enum Dynamic_Contract_Registry_Select_Column {
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  Id = 'id',
  /** column name */
  RegisteringEventBlockNumber = 'registering_event_block_number',
  /** column name */
  RegisteringEventBlockTimestamp = 'registering_event_block_timestamp',
  /** column name */
  RegisteringEventContractName = 'registering_event_contract_name',
  /** column name */
  RegisteringEventLogIndex = 'registering_event_log_index',
  /** column name */
  RegisteringEventName = 'registering_event_name',
  /** column name */
  RegisteringEventSrcAddress = 'registering_event_src_address'
}

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  readonly chain_id: InputMaybe<Scalars['Int']['input']>;
  readonly contract_address: InputMaybe<Scalars['String']['input']>;
  readonly contract_type: InputMaybe<Scalars['contract_type']['input']>;
  readonly id: InputMaybe<Scalars['String']['input']>;
  readonly registering_event_block_number: InputMaybe<Scalars['Int']['input']>;
  readonly registering_event_block_timestamp: InputMaybe<Scalars['Int']['input']>;
  readonly registering_event_contract_name: InputMaybe<Scalars['String']['input']>;
  readonly registering_event_log_index: InputMaybe<Scalars['Int']['input']>;
  readonly registering_event_name: InputMaybe<Scalars['String']['input']>;
  readonly registering_event_src_address: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data = {
  readonly __typename?: 'end_of_block_range_scanned_data';
  readonly block_hash: Scalars['String']['output'];
  readonly block_number: Scalars['Int']['output'];
  readonly chain_id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "end_of_block_range_scanned_data". All fields are combined with a logical 'AND'. */
export type End_Of_Block_Range_Scanned_Data_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  readonly _not: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  readonly block_hash: InputMaybe<String_Comparison_Exp>;
  readonly block_number: InputMaybe<Int_Comparison_Exp>;
  readonly chain_id: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "end_of_block_range_scanned_data". */
export type End_Of_Block_Range_Scanned_Data_Order_By = {
  readonly block_hash: InputMaybe<Order_By>;
  readonly block_number: InputMaybe<Order_By>;
  readonly chain_id: InputMaybe<Order_By>;
};

/** select columns of table "end_of_block_range_scanned_data" */
export enum End_Of_Block_Range_Scanned_Data_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  ChainId = 'chain_id'
}

/** Streaming cursor of the table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input = {
  readonly block_hash: InputMaybe<Scalars['String']['input']>;
  readonly block_number: InputMaybe<Scalars['Int']['input']>;
  readonly chain_id: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "event_sync_state" */
export type Event_Sync_State = {
  readonly __typename?: 'event_sync_state';
  readonly block_number: Scalars['Int']['output'];
  readonly block_timestamp: Scalars['Int']['output'];
  readonly chain_id: Scalars['Int']['output'];
  readonly is_pre_registering_dynamic_contracts: Maybe<Scalars['Boolean']['output']>;
  readonly log_index: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Event_Sync_State_Bool_Exp>>;
  readonly _not: InputMaybe<Event_Sync_State_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Event_Sync_State_Bool_Exp>>;
  readonly block_number: InputMaybe<Int_Comparison_Exp>;
  readonly block_timestamp: InputMaybe<Int_Comparison_Exp>;
  readonly chain_id: InputMaybe<Int_Comparison_Exp>;
  readonly is_pre_registering_dynamic_contracts: InputMaybe<Boolean_Comparison_Exp>;
  readonly log_index: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  readonly block_number: InputMaybe<Order_By>;
  readonly block_timestamp: InputMaybe<Order_By>;
  readonly chain_id: InputMaybe<Order_By>;
  readonly is_pre_registering_dynamic_contracts: InputMaybe<Order_By>;
  readonly log_index: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export enum Event_Sync_State_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  IsPreRegisteringDynamicContracts = 'is_pre_registering_dynamic_contracts',
  /** column name */
  LogIndex = 'log_index'
}

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  readonly block_number: InputMaybe<Scalars['Int']['input']>;
  readonly block_timestamp: InputMaybe<Scalars['Int']['input']>;
  readonly chain_id: InputMaybe<Scalars['Int']['input']>;
  readonly is_pre_registering_dynamic_contracts: InputMaybe<Scalars['Boolean']['input']>;
  readonly log_index: InputMaybe<Scalars['Int']['input']>;
};

export type Jsonb_Cast_Exp = {
  readonly String: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  readonly _cast: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  readonly _contained_in: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  readonly _contains: InputMaybe<Scalars['jsonb']['input']>;
  readonly _eq: InputMaybe<Scalars['jsonb']['input']>;
  readonly _gt: InputMaybe<Scalars['jsonb']['input']>;
  readonly _gte: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  readonly _has_key: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  readonly _has_keys_all: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  readonly _has_keys_any: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['jsonb']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['jsonb']['input']>;
  readonly _lte: InputMaybe<Scalars['jsonb']['input']>;
  readonly _neq: InputMaybe<Scalars['jsonb']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['numeric']['input']>;
  readonly _gt: InputMaybe<Scalars['numeric']['input']>;
  readonly _gte: InputMaybe<Scalars['numeric']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['numeric']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['numeric']['input']>;
  readonly _lte: InputMaybe<Scalars['numeric']['input']>;
  readonly _neq: InputMaybe<Scalars['numeric']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['numeric']['input']>>;
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

/** columns and relationships of "persisted_state" */
export type Persisted_State = {
  readonly __typename?: 'persisted_state';
  readonly abi_files_hash: Scalars['String']['output'];
  readonly config_hash: Scalars['String']['output'];
  readonly envio_version: Scalars['String']['output'];
  readonly handler_files_hash: Scalars['String']['output'];
  readonly id: Scalars['Int']['output'];
  readonly schema_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Persisted_State_Bool_Exp>>;
  readonly _not: InputMaybe<Persisted_State_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Persisted_State_Bool_Exp>>;
  readonly abi_files_hash: InputMaybe<String_Comparison_Exp>;
  readonly config_hash: InputMaybe<String_Comparison_Exp>;
  readonly envio_version: InputMaybe<String_Comparison_Exp>;
  readonly handler_files_hash: InputMaybe<String_Comparison_Exp>;
  readonly id: InputMaybe<Int_Comparison_Exp>;
  readonly schema_hash: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  readonly abi_files_hash: InputMaybe<Order_By>;
  readonly config_hash: InputMaybe<Order_By>;
  readonly envio_version: InputMaybe<Order_By>;
  readonly handler_files_hash: InputMaybe<Order_By>;
  readonly id: InputMaybe<Order_By>;
  readonly schema_hash: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export enum Persisted_State_Select_Column {
  /** column name */
  AbiFilesHash = 'abi_files_hash',
  /** column name */
  ConfigHash = 'config_hash',
  /** column name */
  EnvioVersion = 'envio_version',
  /** column name */
  HandlerFilesHash = 'handler_files_hash',
  /** column name */
  Id = 'id',
  /** column name */
  SchemaHash = 'schema_hash'
}

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  readonly initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  readonly abi_files_hash: InputMaybe<Scalars['String']['input']>;
  readonly config_hash: InputMaybe<Scalars['String']['input']>;
  readonly envio_version: InputMaybe<Scalars['String']['input']>;
  readonly handler_files_hash: InputMaybe<Scalars['String']['input']>;
  readonly id: InputMaybe<Scalars['Int']['input']>;
  readonly schema_hash: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  readonly __typename?: 'query_root';
  /** fetch data from the table: "Beam" */
  readonly Beam: ReadonlyArray<Beam>;
  /** fetch data from the table: "BeamPool" */
  readonly BeamPool: ReadonlyArray<BeamPool>;
  /** fetch data from the table: "BeamPool" using primary key columns */
  readonly BeamPool_by_pk: Maybe<BeamPool>;
  /** fetch data from the table: "BeamR" */
  readonly BeamR: ReadonlyArray<BeamR>;
  /** fetch data from the table: "BeamR_Initialized" */
  readonly BeamR_Initialized: ReadonlyArray<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_Initialized" using primary key columns */
  readonly BeamR_Initialized_by_pk: Maybe<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_PoolCreated" */
  readonly BeamR_PoolCreated: ReadonlyArray<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolCreated" using primary key columns */
  readonly BeamR_PoolCreated_by_pk: Maybe<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" */
  readonly BeamR_PoolMetadataUpdated: ReadonlyArray<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" using primary key columns */
  readonly BeamR_PoolMetadataUpdated_by_pk: Maybe<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" */
  readonly BeamR_RoleAdminChanged: ReadonlyArray<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" using primary key columns */
  readonly BeamR_RoleAdminChanged_by_pk: Maybe<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleGranted" */
  readonly BeamR_RoleGranted: ReadonlyArray<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleGranted" using primary key columns */
  readonly BeamR_RoleGranted_by_pk: Maybe<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleRevoked" */
  readonly BeamR_RoleRevoked: ReadonlyArray<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR_RoleRevoked" using primary key columns */
  readonly BeamR_RoleRevoked_by_pk: Maybe<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR" using primary key columns */
  readonly BeamR_by_pk: Maybe<BeamR>;
  /** fetch data from the table: "Beam" using primary key columns */
  readonly Beam_by_pk: Maybe<Beam>;
  /** fetch data from the table: "DistributionUpdated" */
  readonly DistributionUpdated: ReadonlyArray<DistributionUpdated>;
  /** fetch data from the table: "DistributionUpdated" using primary key columns */
  readonly DistributionUpdated_by_pk: Maybe<DistributionUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" */
  readonly MemberUnitsUpdated: ReadonlyArray<MemberUnitsUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" using primary key columns */
  readonly MemberUnitsUpdated_by_pk: Maybe<MemberUnitsUpdated>;
  /** fetch data from the table: "PoolMetadata" */
  readonly PoolMetadata: ReadonlyArray<PoolMetadata>;
  /** fetch data from the table: "PoolMetadata" using primary key columns */
  readonly PoolMetadata_by_pk: Maybe<PoolMetadata>;
  /** fetch data from the table: "Role" */
  readonly Role: ReadonlyArray<Role>;
  /** fetch data from the table: "Role" using primary key columns */
  readonly Role_by_pk: Maybe<Role>;
  /** fetch data from the table: "TX" */
  readonly TX: ReadonlyArray<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  readonly TX_by_pk: Maybe<Tx>;
  /** fetch data from the table: "TokenMetric" */
  readonly TokenMetric: ReadonlyArray<TokenMetric>;
  /** fetch data from the table: "TokenMetric" using primary key columns */
  readonly TokenMetric_by_pk: Maybe<TokenMetric>;
  /** fetch data from the table: "User" */
  readonly User: ReadonlyArray<User>;
  /** fetch data from the table: "User" using primary key columns */
  readonly User_by_pk: Maybe<User>;
  /** fetch data from the table: "VanityMetrics" */
  readonly VanityMetrics: ReadonlyArray<VanityMetrics>;
  /** fetch data from the table: "VanityMetrics" using primary key columns */
  readonly VanityMetrics_by_pk: Maybe<VanityMetrics>;
  /** fetch data from the table: "chain_metadata" */
  readonly chain_metadata: ReadonlyArray<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  readonly chain_metadata_by_pk: Maybe<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  readonly dynamic_contract_registry: ReadonlyArray<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  readonly dynamic_contract_registry_by_pk: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  readonly end_of_block_range_scanned_data: ReadonlyArray<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  readonly end_of_block_range_scanned_data_by_pk: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  readonly event_sync_state: ReadonlyArray<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  readonly event_sync_state_by_pk: Maybe<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  readonly persisted_state: ReadonlyArray<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  readonly persisted_state_by_pk: Maybe<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  readonly raw_events: ReadonlyArray<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  readonly raw_events_by_pk: Maybe<Raw_Events>;
};


export type Query_RootBeamArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};


export type Query_RootBeamPoolArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamPool_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamPool_Order_By>>;
  where: InputMaybe<BeamPool_Bool_Exp>;
};


export type Query_RootBeamPool_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamRArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_Order_By>>;
  where: InputMaybe<BeamR_Bool_Exp>;
};


export type Query_RootBeamR_InitializedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_Initialized_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_Initialized_Order_By>>;
  where: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Query_RootBeamR_Initialized_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_PoolCreatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Order_By>>;
  where: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Query_RootBeamR_PoolCreated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_PoolMetadataUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Order_By>>;
  where: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Query_RootBeamR_PoolMetadataUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_RoleAdminChangedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Order_By>>;
  where: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Query_RootBeamR_RoleAdminChanged_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_RoleGrantedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Order_By>>;
  where: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Query_RootBeamR_RoleGranted_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_RoleRevokedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Order_By>>;
  where: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Query_RootBeamR_RoleRevoked_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeamR_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBeam_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootDistributionUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<DistributionUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<DistributionUpdated_Order_By>>;
  where: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Query_RootDistributionUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootMemberUnitsUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Order_By>>;
  where: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Query_RootMemberUnitsUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootPoolMetadataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<PoolMetadata_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<PoolMetadata_Order_By>>;
  where: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Query_RootPoolMetadata_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRoleArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Role_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Role_Order_By>>;
  where: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTxArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Tx_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Tx_Order_By>>;
  where: InputMaybe<Tx_Bool_Exp>;
};


export type Query_RootTx_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTokenMetricArgs = {
  distinct_on: InputMaybe<ReadonlyArray<TokenMetric_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<TokenMetric_Order_By>>;
  where: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Query_RootTokenMetric_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUserArgs = {
  distinct_on: InputMaybe<ReadonlyArray<User_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<User_Order_By>>;
  where: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootVanityMetricsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<VanityMetrics_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<VanityMetrics_Order_By>>;
  where: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Query_RootVanityMetrics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChain_MetadataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Chain_Metadata_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Chain_Metadata_Order_By>>;
  where: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootDynamic_Contract_RegistryArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Order_By>>;
  where: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Query_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Query_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Query_RootEvent_Sync_StateArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Event_Sync_State_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Event_Sync_State_Order_By>>;
  where: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Query_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootPersisted_StateArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Persisted_State_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Persisted_State_Order_By>>;
  where: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Query_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRaw_EventsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Raw_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Raw_Events_Order_By>>;
  where: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  readonly __typename?: 'raw_events';
  readonly block_fields: Scalars['jsonb']['output'];
  readonly block_hash: Scalars['String']['output'];
  readonly block_number: Scalars['Int']['output'];
  readonly block_timestamp: Scalars['Int']['output'];
  readonly chain_id: Scalars['Int']['output'];
  readonly contract_name: Scalars['String']['output'];
  readonly db_write_timestamp: Maybe<Scalars['timestamp']['output']>;
  readonly event_id: Scalars['numeric']['output'];
  readonly event_name: Scalars['String']['output'];
  readonly log_index: Scalars['Int']['output'];
  readonly params: Scalars['jsonb']['output'];
  readonly serial: Scalars['Int']['output'];
  readonly src_address: Scalars['String']['output'];
  readonly transaction_fields: Scalars['jsonb']['output'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsBlock_FieldsArgs = {
  path: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsTransaction_FieldsArgs = {
  path: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  readonly _and: InputMaybe<ReadonlyArray<Raw_Events_Bool_Exp>>;
  readonly _not: InputMaybe<Raw_Events_Bool_Exp>;
  readonly _or: InputMaybe<ReadonlyArray<Raw_Events_Bool_Exp>>;
  readonly block_fields: InputMaybe<Jsonb_Comparison_Exp>;
  readonly block_hash: InputMaybe<String_Comparison_Exp>;
  readonly block_number: InputMaybe<Int_Comparison_Exp>;
  readonly block_timestamp: InputMaybe<Int_Comparison_Exp>;
  readonly chain_id: InputMaybe<Int_Comparison_Exp>;
  readonly contract_name: InputMaybe<String_Comparison_Exp>;
  readonly db_write_timestamp: InputMaybe<Timestamp_Comparison_Exp>;
  readonly event_id: InputMaybe<Numeric_Comparison_Exp>;
  readonly event_name: InputMaybe<String_Comparison_Exp>;
  readonly log_index: InputMaybe<Int_Comparison_Exp>;
  readonly params: InputMaybe<Jsonb_Comparison_Exp>;
  readonly serial: InputMaybe<Int_Comparison_Exp>;
  readonly src_address: InputMaybe<String_Comparison_Exp>;
  readonly transaction_fields: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  readonly block_fields: InputMaybe<Order_By>;
  readonly block_hash: InputMaybe<Order_By>;
  readonly block_number: InputMaybe<Order_By>;
  readonly block_timestamp: InputMaybe<Order_By>;
  readonly chain_id: InputMaybe<Order_By>;
  readonly contract_name: InputMaybe<Order_By>;
  readonly db_write_timestamp: InputMaybe<Order_By>;
  readonly event_id: InputMaybe<Order_By>;
  readonly event_name: InputMaybe<Order_By>;
  readonly log_index: InputMaybe<Order_By>;
  readonly params: InputMaybe<Order_By>;
  readonly serial: InputMaybe<Order_By>;
  readonly src_address: InputMaybe<Order_By>;
  readonly transaction_fields: InputMaybe<Order_By>;
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
  DbWriteTimestamp = 'db_write_timestamp',
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
  readonly initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  readonly ordering: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  readonly block_fields: InputMaybe<Scalars['jsonb']['input']>;
  readonly block_hash: InputMaybe<Scalars['String']['input']>;
  readonly block_number: InputMaybe<Scalars['Int']['input']>;
  readonly block_timestamp: InputMaybe<Scalars['Int']['input']>;
  readonly chain_id: InputMaybe<Scalars['Int']['input']>;
  readonly contract_name: InputMaybe<Scalars['String']['input']>;
  readonly db_write_timestamp: InputMaybe<Scalars['timestamp']['input']>;
  readonly event_id: InputMaybe<Scalars['numeric']['input']>;
  readonly event_name: InputMaybe<Scalars['String']['input']>;
  readonly log_index: InputMaybe<Scalars['Int']['input']>;
  readonly params: InputMaybe<Scalars['jsonb']['input']>;
  readonly serial: InputMaybe<Scalars['Int']['input']>;
  readonly src_address: InputMaybe<Scalars['String']['input']>;
  readonly transaction_fields: InputMaybe<Scalars['jsonb']['input']>;
};

export type Subscription_Root = {
  readonly __typename?: 'subscription_root';
  /** fetch data from the table: "Beam" */
  readonly Beam: ReadonlyArray<Beam>;
  /** fetch data from the table: "BeamPool" */
  readonly BeamPool: ReadonlyArray<BeamPool>;
  /** fetch data from the table: "BeamPool" using primary key columns */
  readonly BeamPool_by_pk: Maybe<BeamPool>;
  /** fetch data from the table in a streaming manner: "BeamPool" */
  readonly BeamPool_stream: ReadonlyArray<BeamPool>;
  /** fetch data from the table: "BeamR" */
  readonly BeamR: ReadonlyArray<BeamR>;
  /** fetch data from the table: "BeamR_Initialized" */
  readonly BeamR_Initialized: ReadonlyArray<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_Initialized" using primary key columns */
  readonly BeamR_Initialized_by_pk: Maybe<BeamR_Initialized>;
  /** fetch data from the table in a streaming manner: "BeamR_Initialized" */
  readonly BeamR_Initialized_stream: ReadonlyArray<BeamR_Initialized>;
  /** fetch data from the table: "BeamR_PoolCreated" */
  readonly BeamR_PoolCreated: ReadonlyArray<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolCreated" using primary key columns */
  readonly BeamR_PoolCreated_by_pk: Maybe<BeamR_PoolCreated>;
  /** fetch data from the table in a streaming manner: "BeamR_PoolCreated" */
  readonly BeamR_PoolCreated_stream: ReadonlyArray<BeamR_PoolCreated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" */
  readonly BeamR_PoolMetadataUpdated: ReadonlyArray<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_PoolMetadataUpdated" using primary key columns */
  readonly BeamR_PoolMetadataUpdated_by_pk: Maybe<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table in a streaming manner: "BeamR_PoolMetadataUpdated" */
  readonly BeamR_PoolMetadataUpdated_stream: ReadonlyArray<BeamR_PoolMetadataUpdated>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" */
  readonly BeamR_RoleAdminChanged: ReadonlyArray<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleAdminChanged" using primary key columns */
  readonly BeamR_RoleAdminChanged_by_pk: Maybe<BeamR_RoleAdminChanged>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleAdminChanged" */
  readonly BeamR_RoleAdminChanged_stream: ReadonlyArray<BeamR_RoleAdminChanged>;
  /** fetch data from the table: "BeamR_RoleGranted" */
  readonly BeamR_RoleGranted: ReadonlyArray<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleGranted" using primary key columns */
  readonly BeamR_RoleGranted_by_pk: Maybe<BeamR_RoleGranted>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleGranted" */
  readonly BeamR_RoleGranted_stream: ReadonlyArray<BeamR_RoleGranted>;
  /** fetch data from the table: "BeamR_RoleRevoked" */
  readonly BeamR_RoleRevoked: ReadonlyArray<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR_RoleRevoked" using primary key columns */
  readonly BeamR_RoleRevoked_by_pk: Maybe<BeamR_RoleRevoked>;
  /** fetch data from the table in a streaming manner: "BeamR_RoleRevoked" */
  readonly BeamR_RoleRevoked_stream: ReadonlyArray<BeamR_RoleRevoked>;
  /** fetch data from the table: "BeamR" using primary key columns */
  readonly BeamR_by_pk: Maybe<BeamR>;
  /** fetch data from the table in a streaming manner: "BeamR" */
  readonly BeamR_stream: ReadonlyArray<BeamR>;
  /** fetch data from the table: "Beam" using primary key columns */
  readonly Beam_by_pk: Maybe<Beam>;
  /** fetch data from the table in a streaming manner: "Beam" */
  readonly Beam_stream: ReadonlyArray<Beam>;
  /** fetch data from the table: "DistributionUpdated" */
  readonly DistributionUpdated: ReadonlyArray<DistributionUpdated>;
  /** fetch data from the table: "DistributionUpdated" using primary key columns */
  readonly DistributionUpdated_by_pk: Maybe<DistributionUpdated>;
  /** fetch data from the table in a streaming manner: "DistributionUpdated" */
  readonly DistributionUpdated_stream: ReadonlyArray<DistributionUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" */
  readonly MemberUnitsUpdated: ReadonlyArray<MemberUnitsUpdated>;
  /** fetch data from the table: "MemberUnitsUpdated" using primary key columns */
  readonly MemberUnitsUpdated_by_pk: Maybe<MemberUnitsUpdated>;
  /** fetch data from the table in a streaming manner: "MemberUnitsUpdated" */
  readonly MemberUnitsUpdated_stream: ReadonlyArray<MemberUnitsUpdated>;
  /** fetch data from the table: "PoolMetadata" */
  readonly PoolMetadata: ReadonlyArray<PoolMetadata>;
  /** fetch data from the table: "PoolMetadata" using primary key columns */
  readonly PoolMetadata_by_pk: Maybe<PoolMetadata>;
  /** fetch data from the table in a streaming manner: "PoolMetadata" */
  readonly PoolMetadata_stream: ReadonlyArray<PoolMetadata>;
  /** fetch data from the table: "Role" */
  readonly Role: ReadonlyArray<Role>;
  /** fetch data from the table: "Role" using primary key columns */
  readonly Role_by_pk: Maybe<Role>;
  /** fetch data from the table in a streaming manner: "Role" */
  readonly Role_stream: ReadonlyArray<Role>;
  /** fetch data from the table: "TX" */
  readonly TX: ReadonlyArray<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  readonly TX_by_pk: Maybe<Tx>;
  /** fetch data from the table in a streaming manner: "TX" */
  readonly TX_stream: ReadonlyArray<Tx>;
  /** fetch data from the table: "TokenMetric" */
  readonly TokenMetric: ReadonlyArray<TokenMetric>;
  /** fetch data from the table: "TokenMetric" using primary key columns */
  readonly TokenMetric_by_pk: Maybe<TokenMetric>;
  /** fetch data from the table in a streaming manner: "TokenMetric" */
  readonly TokenMetric_stream: ReadonlyArray<TokenMetric>;
  /** fetch data from the table: "User" */
  readonly User: ReadonlyArray<User>;
  /** fetch data from the table: "User" using primary key columns */
  readonly User_by_pk: Maybe<User>;
  /** fetch data from the table in a streaming manner: "User" */
  readonly User_stream: ReadonlyArray<User>;
  /** fetch data from the table: "VanityMetrics" */
  readonly VanityMetrics: ReadonlyArray<VanityMetrics>;
  /** fetch data from the table: "VanityMetrics" using primary key columns */
  readonly VanityMetrics_by_pk: Maybe<VanityMetrics>;
  /** fetch data from the table in a streaming manner: "VanityMetrics" */
  readonly VanityMetrics_stream: ReadonlyArray<VanityMetrics>;
  /** fetch data from the table: "chain_metadata" */
  readonly chain_metadata: ReadonlyArray<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  readonly chain_metadata_by_pk: Maybe<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  readonly chain_metadata_stream: ReadonlyArray<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  readonly dynamic_contract_registry: ReadonlyArray<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  readonly dynamic_contract_registry_by_pk: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  readonly dynamic_contract_registry_stream: ReadonlyArray<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  readonly end_of_block_range_scanned_data: ReadonlyArray<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  readonly end_of_block_range_scanned_data_by_pk: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table in a streaming manner: "end_of_block_range_scanned_data" */
  readonly end_of_block_range_scanned_data_stream: ReadonlyArray<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  readonly event_sync_state: ReadonlyArray<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  readonly event_sync_state_by_pk: Maybe<Event_Sync_State>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  readonly event_sync_state_stream: ReadonlyArray<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  readonly persisted_state: ReadonlyArray<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  readonly persisted_state_by_pk: Maybe<Persisted_State>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  readonly persisted_state_stream: ReadonlyArray<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  readonly raw_events: ReadonlyArray<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  readonly raw_events_by_pk: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  readonly raw_events_stream: ReadonlyArray<Raw_Events>;
};


export type Subscription_RootBeamArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Beam_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Beam_Order_By>>;
  where: InputMaybe<Beam_Bool_Exp>;
};


export type Subscription_RootBeamPoolArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamPool_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamPool_Order_By>>;
  where: InputMaybe<BeamPool_Bool_Exp>;
};


export type Subscription_RootBeamPool_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamPool_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamPool_Stream_Cursor_Input>>;
  where: InputMaybe<BeamPool_Bool_Exp>;
};


export type Subscription_RootBeamRArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_Order_By>>;
  where: InputMaybe<BeamR_Bool_Exp>;
};


export type Subscription_RootBeamR_InitializedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_Initialized_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_Initialized_Order_By>>;
  where: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Subscription_RootBeamR_Initialized_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_Initialized_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_Initialized_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_Initialized_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolCreatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_PoolCreated_Order_By>>;
  where: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolCreated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_PoolCreated_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_PoolCreated_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_PoolCreated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolMetadataUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_PoolMetadataUpdated_Order_By>>;
  where: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Subscription_RootBeamR_PoolMetadataUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_PoolMetadataUpdated_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_PoolMetadataUpdated_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_PoolMetadataUpdated_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleAdminChangedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleAdminChanged_Order_By>>;
  where: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleAdminChanged_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_RoleAdminChanged_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_RoleAdminChanged_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_RoleAdminChanged_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleGrantedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleGranted_Order_By>>;
  where: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleGranted_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_RoleGranted_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_RoleGranted_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_RoleGranted_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleRevokedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<BeamR_RoleRevoked_Order_By>>;
  where: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Subscription_RootBeamR_RoleRevoked_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_RoleRevoked_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_RoleRevoked_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_RoleRevoked_Bool_Exp>;
};


export type Subscription_RootBeamR_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeamR_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<BeamR_Stream_Cursor_Input>>;
  where: InputMaybe<BeamR_Bool_Exp>;
};


export type Subscription_RootBeam_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBeam_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Beam_Stream_Cursor_Input>>;
  where: InputMaybe<Beam_Bool_Exp>;
};


export type Subscription_RootDistributionUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<DistributionUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<DistributionUpdated_Order_By>>;
  where: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Subscription_RootDistributionUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDistributionUpdated_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<DistributionUpdated_Stream_Cursor_Input>>;
  where: InputMaybe<DistributionUpdated_Bool_Exp>;
};


export type Subscription_RootMemberUnitsUpdatedArgs = {
  distinct_on: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<MemberUnitsUpdated_Order_By>>;
  where: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Subscription_RootMemberUnitsUpdated_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootMemberUnitsUpdated_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<MemberUnitsUpdated_Stream_Cursor_Input>>;
  where: InputMaybe<MemberUnitsUpdated_Bool_Exp>;
};


export type Subscription_RootPoolMetadataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<PoolMetadata_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<PoolMetadata_Order_By>>;
  where: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Subscription_RootPoolMetadata_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPoolMetadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<PoolMetadata_Stream_Cursor_Input>>;
  where: InputMaybe<PoolMetadata_Bool_Exp>;
};


export type Subscription_RootRoleArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Role_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Role_Order_By>>;
  where: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRole_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Role_Stream_Cursor_Input>>;
  where: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootTxArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Tx_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Tx_Order_By>>;
  where: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootTx_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTx_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Tx_Stream_Cursor_Input>>;
  where: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootTokenMetricArgs = {
  distinct_on: InputMaybe<ReadonlyArray<TokenMetric_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<TokenMetric_Order_By>>;
  where: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Subscription_RootTokenMetric_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTokenMetric_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<TokenMetric_Stream_Cursor_Input>>;
  where: InputMaybe<TokenMetric_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on: InputMaybe<ReadonlyArray<User_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<User_Order_By>>;
  where: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<User_Stream_Cursor_Input>>;
  where: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootVanityMetricsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<VanityMetrics_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<VanityMetrics_Order_By>>;
  where: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Subscription_RootVanityMetrics_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootVanityMetrics_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<VanityMetrics_Stream_Cursor_Input>>;
  where: InputMaybe<VanityMetrics_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Chain_Metadata_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Chain_Metadata_Order_By>>;
  where: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_RegistryArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Dynamic_Contract_Registry_Order_By>>;
  where: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDynamic_Contract_Registry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Dynamic_Contract_Registry_Stream_Cursor_Input>>;
  where: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input>>;
  where: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_StateArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Event_Sync_State_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Event_Sync_State_Order_By>>;
  where: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Sync_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Event_Sync_State_Stream_Cursor_Input>>;
  where: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootPersisted_StateArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Persisted_State_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Persisted_State_Order_By>>;
  where: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPersisted_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Persisted_State_Stream_Cursor_Input>>;
  where: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on: InputMaybe<ReadonlyArray<Raw_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  order_by: InputMaybe<ReadonlyArray<Raw_Events_Order_By>>;
  where: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: ReadonlyArray<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['timestamp']['input']>;
  readonly _gt: InputMaybe<Scalars['timestamp']['input']>;
  readonly _gte: InputMaybe<Scalars['timestamp']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['timestamp']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['timestamp']['input']>;
  readonly _lte: InputMaybe<Scalars['timestamp']['input']>;
  readonly _neq: InputMaybe<Scalars['timestamp']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  readonly _eq: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _gt: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _gte: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _in: InputMaybe<ReadonlyArray<Scalars['timestamptz']['input']>>;
  readonly _is_null: InputMaybe<Scalars['Boolean']['input']>;
  readonly _lt: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _lte: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _neq: InputMaybe<Scalars['timestamptz']['input']>;
  readonly _nin: InputMaybe<ReadonlyArray<Scalars['timestamptz']['input']>>;
};

export type TXsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TXsSubscription = { readonly __typename?: 'subscription_root', readonly TX: ReadonlyArray<{ readonly __typename?: 'TX', readonly id: string }> };


export const TXsDocument = gql`
    subscription TXs {
  TX {
    id
  }
}
    `;

export function useTXsSubscription<TData = TXsSubscription>(options?: Omit<Urql.UseSubscriptionArgs<TXsSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<TXsSubscription, TData>) {
  return Urql.useSubscription<TXsSubscription, TData, TXsSubscriptionVariables>({ query: TXsDocument, ...options }, handler);
};