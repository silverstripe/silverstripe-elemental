import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for unpublishing a specific block
const mutation = gql`
mutation UnpublishBlock($blockId:ID!) {
  unpublishBlock(
    ID: $blockId
      ) {
    ID
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
  options: {
    // Refetch versions after mutation is completed
    refetchQueries: ['ReadBlocksForPage']
  }
};

export { mutation, config };

export default graphql(mutation, config);
