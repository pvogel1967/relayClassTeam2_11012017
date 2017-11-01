import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { carMakeType } from '../types/carMakeType';

export const {
  connectionType: carMakeConnectionType,
  edgeType: carMakeEdgeType
} = connectionDefinitions({
  
  name: 'CarMakes',
  nodeType: carMakeType,

  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
    },
  }),

});