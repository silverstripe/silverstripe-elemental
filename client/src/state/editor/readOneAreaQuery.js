import Config from 'lib/Config';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default () => {
  const sectionKey = 'DNADesign\\Elemental\\Controllers\\ElementalAreaController';

  const blockFields = Object.values(Config.getSection(sectionKey).elementTypes).reduce(
    (accumulator, elementType) => {
      const { graphQL: { type, fields } } = elementType;

      return `${accumulator}
      ...on ${type} {
        ${fields.join('\n')}
      }`;
    },
  '');

  // console.log(blockFields);

  const query = gql`
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
      debugger;
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

  return graphql(query, config);
};
