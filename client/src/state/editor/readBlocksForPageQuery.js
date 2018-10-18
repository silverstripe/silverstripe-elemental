import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for retrieving the current state of elements for a page, via the
// ElementalAreaIfExists. The results of the query must be set to the "blocks" prop on
// the component that this HOC is applied to for binding implementation.
const query = gql`
query ReadBlocksForPage($id:ID!) {
  readOnePage(ID: $id, Versioning: {
    Mode: DRAFT
  }){
    ID
    ElementalAreaIfExists {
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
}
`;

const config = {
  options({ pageId }) {
    return {
      variables: {
        id: pageId,
      }
    };
  },
  props(
    {
      data: {
        error,
        readOnePage,
        loading: networkLoading,
      },
    }
  ) {
    let blocks = null;
    if (readOnePage) {
      // Remove the GraphQL pagination keys
      blocks = readOnePage.ElementalAreaIfExists.Elements.edges.map((element) => element.node);
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
