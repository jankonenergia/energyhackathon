const { gql } = require('apollo-server')
const typeDefs = gql`

  """
  Mutations Jankon Energia
  """
  type Mutation {
    createEnergyMeasurementReading(reading: Float!): EnergyMeasurement,
    createUser(user: UserInput!): User,
    updateUser(user: UserUpdateInput!): User,
    deleteUser(_id: String!): User,
    createOrUpdateHousing(housing: HousingInput!): HousingInfo
    deleteHousing(_id: String!): HousingInfo
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
  }

  """
  Querys for Jankon Energia
  """
  type Query {
    user(id: String): User
    users: [User],
    me: User,
    energyMeasurements(email: String!, from: Date, to: Date): [EnergyMeasurement],
    serverInfo: ServerInfo,
    logIn(nickname: String, password: String): User,
  },

  type User {
      _id: ID!,
      createdAt: String!,
      nickname: String,
      firstName: String,
      lastName: String,
      token: String,
      housing: HousingInfo
  },

  type EnergyMeasurement {
      id: ID!,
      createdAt: String!,
      reading: Float,
      from: User
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