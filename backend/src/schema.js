const { gql } = require('apollo-server')
const typeDefs = gql`

  """
  Mutations Jankon Energia
  """
  type Mutation {
    createEnergyMeasurementReading(reading: Float!): EnergyMeasurement,
    createUser(user: UserInput!): User,
  },

  """
  Inputs for Jankon Energia
  """
  input UserInput {
    nickname: String!,
    password: String!,
    firstName: String!,
    lastName: String!
  },

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
  }

  """
  Custom type for dates
  """
  scalar Date
`

module.exports = {
    typeDefs
};