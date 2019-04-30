const resolvers = {
    Query: {
      user: (obj, args) => {},
      users: () => {},
      me: (obj, args, context, info) => getUserByUsername(context.user),
      energyMeasurements: (obj, args, context, info) => {},
    },
    Mutation: {
      createUser: (obj, args) => {},
      createEnergyMeasurementReading: (obj, args) => {}
    },
    User: {
      email: (obj, args, context, info) => obj.ID == context.ID ? obj.email : null
    }
  };

  module.exports = {
    resolvers
};