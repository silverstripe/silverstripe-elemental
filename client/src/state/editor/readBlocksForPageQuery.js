import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for retrieving the current state of elements for a page, via the
// ElementalArea. The results of the query must be set to the "blocks" prop on
// the component that this HOC is applied to for binding implementation.
const query = gql`
query readBlocksForPage($id:ID!) {
  readOnePage(ID: $id, Versioning: {
    Mode: LATEST
  }){
    ID
    ElementalArea {
      Elements {
        pageInfo {
          totalCount
        }
        edges {
          node {
            ID
            Title
            Summary
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
        readBlocksForPage,
        loading: networkLoading,
      },
    }
  ) {
    const blocks = readBlocksForPage || null;

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
