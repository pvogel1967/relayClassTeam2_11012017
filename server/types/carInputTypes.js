import {GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql';
export const insertCarType = new GraphQLInputObjectType({
  name: 'InsertCar',
  fields: () => ({
    make: {type: GraphQLString},
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    color: { type: GraphQLString },
    price: { type: GraphQLFloat },
  })
});