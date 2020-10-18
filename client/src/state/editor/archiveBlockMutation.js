import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for deleting a specific block
const mutation = gql`
mutation ArchiveBlock($blockId: ID!) {
  deleteBlocks(ids: [$blockId])
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleArchiveBlock = (blockId) => mutate({
      variables: { blockId },
    });

    return {
      actions: {
        ...actions,
        handleArchiveBlock,
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
