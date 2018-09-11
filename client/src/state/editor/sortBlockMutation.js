import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for changing the sort order of blocks
const mutation = gql`
mutation SortBlockMutation($blockId:ID!, $afterBlockId:ID!) {
  sortBlock(
    ID: $blockId
    AfterBlockID: $afterBlockId
  ) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleSortBlock = (blockId, afterBlockId) => mutate({
      variables: {
        blockId,
        afterBlockId,
      },
    });
    return {
      actions: {
        ...actions,
        handleSortBlock,
      },
    };
  },
  options: {
    // Refetch versions after mutation is completed
    refetchQueries: ['ReadBlocksForPage']
  }
};

export { mutation, config };

export default graphql(mutation, config);
