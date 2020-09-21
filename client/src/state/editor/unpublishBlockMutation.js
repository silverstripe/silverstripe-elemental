import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for unpublishing a specific block
const mutation = gql`
mutation UnpublishBlock($blockId:ID!) {
  unpublishBlock(
    id: $blockId
      ) {
    id
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleUnpublishBlock = (blockId, fromStage, toStage, fromVersion) => mutate({
      variables: {
        blockId,
        fromStage,
        toStage,
        fromVersion
      },
    });

    return {
      actions: {
        ...actions,
        handleUnpublishBlock,
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
