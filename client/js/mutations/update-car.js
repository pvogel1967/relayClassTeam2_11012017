import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation updateCarMutation($input: UpdateCarInput!) {
    updateCar(input: $input) {
      viewer {
        id
      }
      car {
        id
        make
        model
        year
        color
        price
      }
    }
  }
`;

const getOptimisticResponse = (car) => ({ updateCar: { car } });

let clientMutationId = 0;

export const updateCar = (environment, car) => {
    return commitMutation(
        environment,
        {
            mutation,
            variables: { input: {
                car,
                clientMutationId: String(clientMutationId++),
            } },
            optimisticResponse: getOptimisticResponse(car),
        }
    );
};