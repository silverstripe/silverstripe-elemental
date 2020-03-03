import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for duplicating a specific block
const mutation = gql`
mutation DuplicateBlock($blockId: ID!) {
  duplicateBlock(ID: $blockId) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleDuplicateBlock = (blockId) => mutate({
      variables: { blockId },
    });

    return {
      actions: {
        ...actions,
        handleDuplicateBlock,
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
