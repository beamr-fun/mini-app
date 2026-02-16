/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "subscription GlobalMostRecent {\n  Beam(\n    order_by: {lastUpdated: desc}\n    limit: 20\n    where: {beamPool: {active: {_eq: true}}}\n  ) {\n    id\n    units\n    lastUpdated\n    beamPool {\n      flowRate\n      totalUnits\n    }\n    from {\n      fid\n      id\n    }\n    to {\n      fid\n      id\n    }\n  }\n}\n\nsubscription GlobalTop {\n  BeamPool(\n    order_by: {flowRate: desc_nulls_last}\n    limit: 20\n    where: {active: {_eq: true}}\n  ) {\n    id\n    flowRate\n    totalUnits\n    creatorAccount {\n      address\n      user {\n        fid\n      }\n    }\n  }\n}": types.GlobalMostRecentDocument,
    "subscription LoggedInUser($id: String!) {\n  User_by_pk(id: $id) {\n    id\n    pools {\n      id\n      flowRate\n      totalUnits\n      active\n      hasDistributed\n      metadata {\n        name\n      }\n      creatorAccount {\n        address\n      }\n    }\n    incoming(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      id\n      units\n      isReceiverConnected\n      lastUpdated\n      beamPool {\n        flowRate\n        totalUnits\n        id\n      }\n      from {\n        fid\n        id\n      }\n    }\n    outgoing(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      units\n      id\n      beamPool {\n        flowRate\n        creatorFlowRate\n        totalUnits\n        id\n      }\n      to {\n        id\n        fid\n      }\n    }\n  }\n}": types.LoggedInUserDocument,
    "query GetTxById($id: String!) {\n  TX_by_pk(id: $id) {\n    id\n  }\n}": types.GetTxByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription GlobalMostRecent {\n  Beam(\n    order_by: {lastUpdated: desc}\n    limit: 20\n    where: {beamPool: {active: {_eq: true}}}\n  ) {\n    id\n    units\n    lastUpdated\n    beamPool {\n      flowRate\n      totalUnits\n    }\n    from {\n      fid\n      id\n    }\n    to {\n      fid\n      id\n    }\n  }\n}\n\nsubscription GlobalTop {\n  BeamPool(\n    order_by: {flowRate: desc_nulls_last}\n    limit: 20\n    where: {active: {_eq: true}}\n  ) {\n    id\n    flowRate\n    totalUnits\n    creatorAccount {\n      address\n      user {\n        fid\n      }\n    }\n  }\n}"): (typeof documents)["subscription GlobalMostRecent {\n  Beam(\n    order_by: {lastUpdated: desc}\n    limit: 20\n    where: {beamPool: {active: {_eq: true}}}\n  ) {\n    id\n    units\n    lastUpdated\n    beamPool {\n      flowRate\n      totalUnits\n    }\n    from {\n      fid\n      id\n    }\n    to {\n      fid\n      id\n    }\n  }\n}\n\nsubscription GlobalTop {\n  BeamPool(\n    order_by: {flowRate: desc_nulls_last}\n    limit: 20\n    where: {active: {_eq: true}}\n  ) {\n    id\n    flowRate\n    totalUnits\n    creatorAccount {\n      address\n      user {\n        fid\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription LoggedInUser($id: String!) {\n  User_by_pk(id: $id) {\n    id\n    pools {\n      id\n      flowRate\n      totalUnits\n      active\n      hasDistributed\n      metadata {\n        name\n      }\n      creatorAccount {\n        address\n      }\n    }\n    incoming(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      id\n      units\n      isReceiverConnected\n      lastUpdated\n      beamPool {\n        flowRate\n        totalUnits\n        id\n      }\n      from {\n        fid\n        id\n      }\n    }\n    outgoing(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      units\n      id\n      beamPool {\n        flowRate\n        creatorFlowRate\n        totalUnits\n        id\n      }\n      to {\n        id\n        fid\n      }\n    }\n  }\n}"): (typeof documents)["subscription LoggedInUser($id: String!) {\n  User_by_pk(id: $id) {\n    id\n    pools {\n      id\n      flowRate\n      totalUnits\n      active\n      hasDistributed\n      metadata {\n        name\n      }\n      creatorAccount {\n        address\n      }\n    }\n    incoming(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      id\n      units\n      isReceiverConnected\n      lastUpdated\n      beamPool {\n        flowRate\n        totalUnits\n        id\n      }\n      from {\n        fid\n        id\n      }\n    }\n    outgoing(\n      order_by: {lastUpdated: desc}\n      where: {beamPool: {active: {_eq: true}}}\n    ) {\n      units\n      id\n      beamPool {\n        flowRate\n        creatorFlowRate\n        totalUnits\n        id\n      }\n      to {\n        id\n        fid\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetTxById($id: String!) {\n  TX_by_pk(id: $id) {\n    id\n  }\n}"): (typeof documents)["query GetTxById($id: String!) {\n  TX_by_pk(id: $id) {\n    id\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;