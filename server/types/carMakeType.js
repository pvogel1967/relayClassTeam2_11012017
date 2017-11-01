import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { CarMake } from '../models/graphql-models';
import { CarMakeData } from '../models/car-make-data';

export const carMakeType = new GraphQLObjectType({

  name: 'CarMake',

  description: 'A car manufacturer and the models and colors they support',

  fields: () => ({
    id: globalIdField('CarMake'),
    name: { type: GraphQLString },
    models: {type: new GraphQLList(GraphQLString) },
    colors: {type: new GraphQLList(GraphQLString) },
  }),

  interfaces: () => [ nodeInterface ],

});

const carMakeData = new CarMakeData('http://localhost:3010');
registerType(CarMake, carMakeType, id => {
  return carMakeData.one(id).then(make => Object.assign(new CarMake(), make));
});
