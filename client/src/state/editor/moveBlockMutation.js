import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for moving a specific block
const mutation = gql`
mutation MoveBlock($blockId:ID!) {
  moveBlock(
    id: $blockId
      ) {
    id
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleMoveBlock = (blockId) => mutate({
      variables: {
        blockId,
      },
    });

    return {
      actions: {
        ...actions,
        handleMoveBlock,
      },
    };
  },
  options: ({ areaId }) => ({
    // Refetch versions after mutation is completed
    refetchQueries: [{
      query: readBlocksQuery,
      variables: readBlocksConfig.options({ areaId }).variables
    }]
  }),
};

export { mutation, config };

export default graphql(mutation, config);
