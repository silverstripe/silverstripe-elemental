import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import configProvider from '../elementalConfigProvider';

const queryProvider = () => {
  const blockFields = Object.values(configProvider().elementTypes).reduce(
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
    let blocks = null;
    if (readOneElementalArea) {
      // Remove the GraphQL pagination keys
      blocks = readOneElementalArea.Elements.edges.map((element) => element.node);
    }

    const errors = error && error.graphQLErrors &&
      error.graphQLErrors.map((graphQLError) => graphQLError.message);

    return {
      loading: networkLoading || !blocks,
      blocks,
      graphQLErrors: errors,
    };
  },
};

export { queryProvider, config };

export default () => graphql(queryProvider(), config);
