import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for saving a specific block
const mutation = gql`
mutation PublishBlock($blockId:ID!, $fromStage:VersionedStage!, $toStage:VersionedStage!, $fromVersion:Int!) {
  copyBlockToStage(Input: {
    ID: $blockId
    FromVersion: $fromVersion
    FromStage: $fromStage
    ToStage: $toStage
  }) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handlePublishBlock = (blockId, fromStage, toStage, fromVersion) => mutate({
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
