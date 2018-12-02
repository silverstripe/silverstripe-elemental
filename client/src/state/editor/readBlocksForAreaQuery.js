import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for retrieving the current state of elements for an area. The results of the query
// must be set to the "blocks" prop on the component that this HOC is applied to for binding
// implementation.
const query = gql`
query ReadBlocksForArea($id:ID!) {
  readOneElementalArea(ID: $id, Versioning: {
    Mode: DRAFT
  }){
    Elements {
      pageInfo {
        totalCount
      }
      edges {
        node {
          ID
          Title
          BlockSchema
          IsLiveVersion
          IsPublished
          Version
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

export { query, config };

export default graphql(query, config);
