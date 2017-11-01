import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { CarForm } from './car-form';

import { insertCar as relayInsertCar } from '../mutations/insert-car';

export class CarFormHome extends React.Component {

    reactInsertCar = car => {
        return relayInsertCar(
            this.props.relay.environment,
            this.props.viewer.id,
            car,
        );
    };

    render() {
        return <CarForm
            carmakes={this.props.viewer.carmakes.edges}
            onSubmitCar={this.reactInsertCar}
            onShowCarTable={this.props.onShowCarTable} />;
    }

}

export const CarFormHomeContainer = createFragmentContainer(
  CarFormHome, graphql`
    fragment carFormHome_viewer on Viewer {
      id
      carmakes {
        edges {
          node {
            id
            name
            models
            colors
          }
        }
      }
    }
  `
);