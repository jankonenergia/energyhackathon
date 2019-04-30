const { gql } = require('apollo-server')
const typeDefs = gql`

  """
  Mutations Jankon Energia
  """
  type Mutation {
    createEnergyMeasurementReading(reading: Float!): EnergyMeasurement,
    createUser(user: UserInput!): User
  },

  """
  Inputs for Jankon Energia
  """
  input UserInput {
    email: String!,
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
    serverInfo: ServerInfo
  },

  type User {
      id: ID!,
      createdAt: String!,
      email: String,
      firstName: String,
      lastName: String
  },

  type EnergyMeasurement {
      id: ID!,
      createdAt: String!,
      reading: Float,
      from: User
  },

  type ServetInfo {
      info
  }

  """
  Custom type for dates
  """
  scalar Date
`

module.exports = {
    typeDefs
};