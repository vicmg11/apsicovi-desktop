export const typeDefs = /* GraphQL */ `type AggregateUser {
  count: Int!
}

type AggregateVisitor {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVisitor(data: VisitorCreateInput!): Visitor!
  updateVisitor(data: VisitorUpdateInput!, where: VisitorWhereUniqueInput!): Visitor
  updateManyVisitors(data: VisitorUpdateInput!, where: VisitorWhereInput): BatchPayload!
  upsertVisitor(where: VisitorWhereUniqueInput!, create: VisitorCreateInput!, update: VisitorUpdateInput!): Visitor!
  deleteVisitor(where: VisitorWhereUniqueInput!): Visitor
  deleteManyVisitors(where: VisitorWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum Permission {
  ADMIN
  MAINUSER
  USER
  PERMISSIONUPDATE
}

type Query {
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  visitor(where: VisitorWhereUniqueInput!): Visitor
  visitors(where: VisitorWhereInput, orderBy: VisitorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Visitor]!
  visitorsConnection(where: VisitorWhereInput, orderBy: VisitorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VisitorConnection!
  node(id: ID!): Node
}

enum Status {
  ACTIVE
  INACTIVE
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  visitor(where: VisitorSubscriptionWhereInput): VisitorSubscriptionPayload
}

type User {
  id: ID!
  streetId: Int
  name: String!
  email: String!
  price: Int
  host: String
  expirationDate: DateTime
  database: String
  status: [Status!]!
  password: String!
  resetToken: String
  resetTokenExpiry: String
  permissions: [Permission!]!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  streetId: Int
  name: String!
  email: String!
  price: Int
  host: String
  expirationDate: DateTime
  database: String
  status: UserCreatestatusInput
  password: String!
  resetToken: String
  resetTokenExpiry: String
  permissions: UserCreatepermissionsInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreatestatusInput {
  set: [Status!]
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  streetId_ASC
  streetId_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  price_ASC
  price_DESC
  host_ASC
  host_DESC
  expirationDate_ASC
  expirationDate_DESC
  database_ASC
  database_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  streetId: Int
  name: String!
  email: String!
  price: Int
  host: String
  expirationDate: DateTime
  database: String
  status: [Status!]!
  password: String!
  resetToken: String
  resetTokenExpiry: String
  permissions: [Permission!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  streetId: Int
  name: String
  email: String
  price: Int
  host: String
  expirationDate: DateTime
  database: String
  status: UserUpdatestatusInput
  password: String
  resetToken: String
  resetTokenExpiry: String
  permissions: UserUpdatepermissionsInput
}

input UserUpdateInput {
  streetId: Int
  name: String
  email: String
  price: Int
  host: String
  expirationDate: DateTime
  database: String
  status: UserUpdatestatusInput
  password: String
  resetToken: String
  resetTokenExpiry: String
  permissions: UserUpdatepermissionsInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdatestatusInput {
  set: [Status!]
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  streetId: Int
  streetId_not: Int
  streetId_in: [Int!]
  streetId_not_in: [Int!]
  streetId_lt: Int
  streetId_lte: Int
  streetId_gt: Int
  streetId_gte: Int
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  price: Int
  price_not: Int
  price_in: [Int!]
  price_not_in: [Int!]
  price_lt: Int
  price_lte: Int
  price_gt: Int
  price_gte: Int
  host: String
  host_not: String
  host_in: [String!]
  host_not_in: [String!]
  host_lt: String
  host_lte: String
  host_gt: String
  host_gte: String
  host_contains: String
  host_not_contains: String
  host_starts_with: String
  host_not_starts_with: String
  host_ends_with: String
  host_not_ends_with: String
  expirationDate: DateTime
  expirationDate_not: DateTime
  expirationDate_in: [DateTime!]
  expirationDate_not_in: [DateTime!]
  expirationDate_lt: DateTime
  expirationDate_lte: DateTime
  expirationDate_gt: DateTime
  expirationDate_gte: DateTime
  database: String
  database_not: String
  database_in: [String!]
  database_not_in: [String!]
  database_lt: String
  database_lte: String
  database_gt: String
  database_gte: String
  database_contains: String
  database_not_contains: String
  database_starts_with: String
  database_not_starts_with: String
  database_ends_with: String
  database_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: String
  resetTokenExpiry_not: String
  resetTokenExpiry_in: [String!]
  resetTokenExpiry_not_in: [String!]
  resetTokenExpiry_lt: String
  resetTokenExpiry_lte: String
  resetTokenExpiry_gt: String
  resetTokenExpiry_gte: String
  resetTokenExpiry_contains: String
  resetTokenExpiry_not_contains: String
  resetTokenExpiry_starts_with: String
  resetTokenExpiry_not_starts_with: String
  resetTokenExpiry_ends_with: String
  resetTokenExpiry_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Visitor {
  id: ID!
  name: String!
  visitorType: String!
  image: String
  largeImage: String
  description: String
  status: [Status!]!
  expectedStartTime: String
  expectedEndTime: String
  expectedStartDate: String
  user: User!
}

type VisitorConnection {
  pageInfo: PageInfo!
  edges: [VisitorEdge]!
  aggregate: AggregateVisitor!
}

input VisitorCreateInput {
  name: String!
  visitorType: String!
  image: String
  largeImage: String
  description: String
  status: VisitorCreatestatusInput
  expectedStartTime: String
  expectedEndTime: String
  expectedStartDate: String
  user: UserCreateOneInput!
}

input VisitorCreatestatusInput {
  set: [Status!]
}

type VisitorEdge {
  node: Visitor!
  cursor: String!
}

enum VisitorOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  visitorType_ASC
  visitorType_DESC
  image_ASC
  image_DESC
  largeImage_ASC
  largeImage_DESC
  description_ASC
  description_DESC
  expectedStartTime_ASC
  expectedStartTime_DESC
  expectedEndTime_ASC
  expectedEndTime_DESC
  expectedStartDate_ASC
  expectedStartDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VisitorPreviousValues {
  id: ID!
  name: String!
  visitorType: String!
  image: String
  largeImage: String
  description: String
  status: [Status!]!
  expectedStartTime: String
  expectedEndTime: String
  expectedStartDate: String
}

type VisitorSubscriptionPayload {
  mutation: MutationType!
  node: Visitor
  updatedFields: [String!]
  previousValues: VisitorPreviousValues
}

input VisitorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VisitorWhereInput
  AND: [VisitorSubscriptionWhereInput!]
  OR: [VisitorSubscriptionWhereInput!]
  NOT: [VisitorSubscriptionWhereInput!]
}

input VisitorUpdateInput {
  name: String
  visitorType: String
  image: String
  largeImage: String
  description: String
  status: VisitorUpdatestatusInput
  expectedStartTime: String
  expectedEndTime: String
  expectedStartDate: String
  user: UserUpdateOneRequiredInput
}

input VisitorUpdatestatusInput {
  set: [Status!]
}

input VisitorWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  visitorType: String
  visitorType_not: String
  visitorType_in: [String!]
  visitorType_not_in: [String!]
  visitorType_lt: String
  visitorType_lte: String
  visitorType_gt: String
  visitorType_gte: String
  visitorType_contains: String
  visitorType_not_contains: String
  visitorType_starts_with: String
  visitorType_not_starts_with: String
  visitorType_ends_with: String
  visitorType_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  largeImage: String
  largeImage_not: String
  largeImage_in: [String!]
  largeImage_not_in: [String!]
  largeImage_lt: String
  largeImage_lte: String
  largeImage_gt: String
  largeImage_gte: String
  largeImage_contains: String
  largeImage_not_contains: String
  largeImage_starts_with: String
  largeImage_not_starts_with: String
  largeImage_ends_with: String
  largeImage_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  expectedStartTime: String
  expectedStartTime_not: String
  expectedStartTime_in: [String!]
  expectedStartTime_not_in: [String!]
  expectedStartTime_lt: String
  expectedStartTime_lte: String
  expectedStartTime_gt: String
  expectedStartTime_gte: String
  expectedStartTime_contains: String
  expectedStartTime_not_contains: String
  expectedStartTime_starts_with: String
  expectedStartTime_not_starts_with: String
  expectedStartTime_ends_with: String
  expectedStartTime_not_ends_with: String
  expectedEndTime: String
  expectedEndTime_not: String
  expectedEndTime_in: [String!]
  expectedEndTime_not_in: [String!]
  expectedEndTime_lt: String
  expectedEndTime_lte: String
  expectedEndTime_gt: String
  expectedEndTime_gte: String
  expectedEndTime_contains: String
  expectedEndTime_not_contains: String
  expectedEndTime_starts_with: String
  expectedEndTime_not_starts_with: String
  expectedEndTime_ends_with: String
  expectedEndTime_not_ends_with: String
  expectedStartDate: String
  expectedStartDate_not: String
  expectedStartDate_in: [String!]
  expectedStartDate_not_in: [String!]
  expectedStartDate_lt: String
  expectedStartDate_lte: String
  expectedStartDate_gt: String
  expectedStartDate_gte: String
  expectedStartDate_contains: String
  expectedStartDate_not_contains: String
  expectedStartDate_starts_with: String
  expectedStartDate_not_starts_with: String
  expectedStartDate_ends_with: String
  expectedStartDate_not_ends_with: String
  user: UserWhereInput
  AND: [VisitorWhereInput!]
  OR: [VisitorWhereInput!]
  NOT: [VisitorWhereInput!]
}

input VisitorWhereUniqueInput {
  id: ID
}
`