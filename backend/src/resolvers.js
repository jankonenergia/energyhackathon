const resolvers = {
    Query: {
      user: (obj, args) => {},
      users: () => {},
      me: (obj, args, context, info) => context.user,
      energyMeasurements: (obj, args, context, info) => {},
      serverInfo: () => { return { buildNumber: process.env.VERSION, commitMessage: process.env.COMMIT_MESSAGE, commit: process.env.COMMIT}}
    },
    Mutation: {
      createUser: (obj, args) => {},
      createEnergyMeasurementReading: (obj, args) => {}
    }
  }

  module.exports = {
    resolvers
}