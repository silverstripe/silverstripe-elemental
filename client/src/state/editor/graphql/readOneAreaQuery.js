import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { elementConfigProvider } from '../getElementConfig';

const queryProvider = () => {
  const blockFields = Object.values(elementConfigProvider().elementTypes).reduce(
    (accumulator, elementType) => {
      const { graphQL: { type, fields } } = elementType;

      return `${accumulator}
      ...on ${type} {
        ${fields.join('\n')}
      }`;
    }, '');

  return gql`
  query ReadElementsForArea($id: ID!)  {
    readOneElementalArea(ID: $id) {
      Elements {
        edges {
          node {
            ${blockFields}
          }
        }
      }
    }
  }
  `;
};

const config = {
  options({ areaId }) {
    return {
      variables: {
        id: areaId,
      }
    };
  },
  props(
    {
      data: {
        error,
        readOneElementalArea,
        loading: networkLoading,
      },
    }
  ) {
    let elements = null;
    if (readOneElementalArea) {
      // Remove the GraphQL pagination keys
      elements = readOneElementalArea.Elements.edges.map((element) => element.node);
    }

    const errors = error && error.graphQLErrors &&
      error.graphQLErrors.map((graphQLError) => graphQLError.message);

    return {
      loading: networkLoading || !elements,
      elements,
      graphQLErrors: errors,
    };
  },
};

export { queryProvider, config };

export default () => graphql(queryProvider(), config);
