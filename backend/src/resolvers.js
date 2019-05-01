const resolvers = {
    Query: {
      user: (obj, args) => {},
      users: () => {},
      me: (obj, args, context, info) => context.user,
      energyMeasurements: (obj, args, context, info) => {},
      serverInfo: () => { return { buildNumber: process.env.TRAVIS_BUILD_NUMBER, commitMessage: process.env.TRAVIS_COMMIT_MESSAGE}}
    },
    Mutation: {
      createUser: (obj, args) => {},
      createEnergyMeasurementReading: (obj, args) => {}
    }
  }

  module.exports = {
    resolvers
}