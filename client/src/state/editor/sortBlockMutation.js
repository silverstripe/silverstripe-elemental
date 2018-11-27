import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { query as readBlocksQuery, config as readBlocksConfig } from './readBlocksForAreaQuery';

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
    const handleSortBlock = (blockId, afterBlockId, areaId) => mutate({
      variables: {
        blockId,
        afterBlockId,
      },
      optimisticResponse: {
        sortBlock: {
          ID: blockId,
          __typename: 'Block',
        },
      },
      update: store => {
        const variables = readBlocksConfig.options({ areaId }).variables;
        const data = store.readQuery({ query: readBlocksQuery, variables });

        // Query returns a deeply nested object. Explicit reconstruction via spreads is too verbose.
        // This is an alternative, relatively efficient way to deep clone
        const newData = JSON.parse(JSON.stringify(data));
        let { edges } = newData.readOnePage.Elements;

        // Find the block we reordered
        const movedBlockIndex = edges.findIndex(edge => edge.node.ID === blockId);
        // Keep it
        const movedBlock = edges[movedBlockIndex];
        // Remove the moved block
        edges.splice(movedBlockIndex, 1);
        // If the target is 0, it's added to the start
        if (!afterBlockId) {
          edges.unshift(movedBlock);
        } else {
          // Else, find the block we inserted after
          const targetBlockIndex = edges.findIndex(edge => edge.node.ID === afterBlockId);
          // Add it back after the target
          const end = edges.slice(targetBlockIndex + 1);
          edges = edges.slice(0, targetBlockIndex + 1);
          edges.push(movedBlock);
          edges = edges.concat(end);
        }

        // Add it back to the full result
        newData.readOnePage.Elements.edges = edges;
        store.writeQuery({ query: readBlocksQuery, data: newData, variables });
      },
    });
    return {
      actions: {
        ...actions,
        handleSortBlock,
      },
    };
  },
};

export { mutation, config };

export default graphql(mutation, config);
