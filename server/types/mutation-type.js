import { GraphQLObjectType } from 'graphql';

import { insertWidgetMutationType as insertWidget } from './insert-widget-mutation-type';
import { deleteWidgetMutationType as deleteWidget } from './delete-widget-mutation-type';
import { updateWidgetMutationType as updateWidget } from './update-widget-mutation-type';
import { insertCarMutationType as insertCar } from './insert-car-mutation-type';
import { deleteCarMutationType as deleteCar } from './delete-car-mutation-type';
import { updateCarMutationType as updateCar} from './updateCarMutationType';

export const mutation = new GraphQLObjectType({

  name: 'Mutation',

  fields: () => ({
    insertWidget,
    deleteWidget,
    updateWidget,
    insertCar,
    deleteCar,
    updateCar,
  }),

});