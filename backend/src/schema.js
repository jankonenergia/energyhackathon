const { gql } = require('apollo-server')
const typeDefs = gql`

  """
  Mutations Jankon Energia
  """
  type Mutation {
    createUser(user: UserInput!): User,
    updateUser(user: UserUpdateInput!): User,
    deleteUser(_id: String!): User,
    createOrUpdateHousing(housing: HousingInput!): HousingInfo,
    deleteHousing(_id: String!): HousingInfo,
    createMeasurement(measurement: MeasurementInput!): Measurement
    deleteMeasurement(_id: ID!): Measurement
    logIn(nickname: String, password: String): User,
  },

  """
  Querys for Jankon Energia
  """
  type Query {
    user(id: String): User
    users: [User],
    me: User,
    measurements(userId: String!, from: Date!, to: Date!): [Measurement]
    friendMeasurements(userId: String!, from: Date!, to: Date!): [Measurement]
    serverInfo: ServerInfo,
  },

  """
  Inputs for Jankon Energia
  """
  input UserInput {
    _id: String,
    nickname: String!,
    password: String!,
    firstName: String!,
    lastName: String!
  },

  input UserUpdateInput {
    _id: String!,
    nickname: String!,
    firstName: String!,
    lastName: String!
  },

  input HousingInput {
    _id: ID,
    postalCode: String!,
    address: String!,
    housingType: HOUSINGTYPE!,
    heatingType: HEATINGTYPE!,
    userId: String!, 
  },

  input MeasurementInput {
    userId: String!,
    value: Float!,
    date: Date!
  },

  """
  Types for Jankon Energia
  """
  type User {
      _id: ID!,
      createdAt: String!,
      nickname: String,
      firstName: String,
      lastName: String,
      token: String,
      housing: HousingInfo
  },

  type ServerInfo {
      buildNumber: String,
      commitMessage: String,
      commit: String
  },

  type HousingInfo {
    _id: ID,
    postalCode: String,
    address: String,
    housingType: HOUSINGTYPE,
    heatingType: HEATINGTYPE,
    userId: String, 
    user: User
  }

  type Measurement {
    _id: ID,
    userId: String,
    user: User,
    value: Float
    date: Date
  },

  """
  Enums
  """
  enum HOUSINGTYPE {
    HOUSE
    APARTMENT
    ROWHOUSE
  },

  enum HEATINGTYPE {
    OIL
    WOOD
    ELECTRICITY
    GAS
  },

  """
  Custom type for dates
  """
  scalar Date
`
module.exports = {
    typeDefs
};