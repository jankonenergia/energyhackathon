const resolvers = {
    Query: {
      user: (obj, args) => {},
      users: () => {},
      me: (obj, args, context, info) => context.user,
      energyMeasurements: (obj, args, context, info) => {},
    },
    Mutation: {
      createUser: (obj, args) => {},
      createEnergyMeasurementReading: (obj, args) => {}
    }
  }

  module.exports = {
    resolvers
}