import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for saving a specific block
const mutation = gql`
mutation PublishBlock($blockId:ID!) {
  publishBlock(id: $blockId) {
    id
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handlePublishBlock = (blockId) => mutate({
      variables: {
        blockId
      },
    });

    return {
      actions: {
        ...actions,
        handlePublishBlock,
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
