import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { widgetConnectionType } from '../connections/widgets';
import { carConnectionType } from '../connections/cars';
import { carMakeConnectionType} from '../connections/carMakes';
import { WidgetData } from '../models/widget-data';
import { CarData } from '../models/car-data';
import { CarMakeData} from '../models/car-make-data';
import { Widget, Viewer, Car, CarMake } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      description: 'get all of the widgets',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));
          const conn = connectionFromArray(widgetModels, args);
          conn.totalCount = widgetModels.length;
          return conn;
        });
      },
    },
    cars: {
      type: carConnectionType,
      description: 'get all of the cars',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {
          const carModels = cars.map(c => Object.assign(new Car(), c));
          const conn = connectionFromArray(carModels, args);
          conn.totalCount = carModels.length;
          const totalValue = carModels.reduce((total, car)=>{return total+car.price;}, 0.0);
          //console.log('calculated total value=', totalValue);
          conn.totalValue = totalValue;
          return conn;

        });
      },
    },
    carmakes: {
      type: carMakeConnectionType,
      description: 'get all possible car makes and their details',
      args: connectionArgs,
      resolve: (_, args, {baseUrl}) => {
        const carMakeData = new CarMakeData(baseUrl);
        return carMakeData.all().then(makes=>{
          const carMakes = makes.map(m=>Object.assign(new CarMake(), m));
          const conn = connectionFromArray(carMakes, args);
          conn.totalCount = carMakes.length;
          return conn;
        });
      },
    },
  }),

  interfaces: () => [ nodeInterface ],

});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});