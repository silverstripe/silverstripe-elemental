import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for deleting a specific block
const mutation = gql`
mutation DeleteBlock($blockId: ID!) {
  deleteBlock(IDs: [$blockId]) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleDeleteBlock = (blockId) => mutate({
      variables: { blockId },
    });

    return {
      actions: {
        ...actions,
        handleDeleteBlock,
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
