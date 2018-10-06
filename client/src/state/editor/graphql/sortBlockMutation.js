import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { queryProvider as readAreaQueryProvider, config as readAreaConfig } from './readOneAreaQuery';

// GraphQL query for changing the sort order of blocks
const mutation = gql`
mutation SortBlockMutation($elementId:ID!, $afterElementId:ID!) {
  sortBlock(
    ID: $elementId
    AfterBlockID: $afterElementId
  ) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleSortBlock = (elementId, afterElementId, areaId) => mutate({
      variables: {
        elementId,
        afterElementId,
      },
      optimisticResponse: {
        ID: elementId,
        __typename: 'Block',
      },
      update: store => {
        const variables = readAreaConfig.options({ areaId }).variables;
        const readAreaQuery = readAreaQueryProvider();
        const data = store.readQuery({ query: readAreaQuery, variables });

        // Query returns a deeply nested object. Explicit reconstruction via spreads is too verbose.
        // This is an alternative, relatively efficient way to deep clone
        const newData = JSON.parse(JSON.stringify(data));
        let { edges } = newData.readOnePage.ElementalAreaIfExists.Elements;

        // Find the block we reordered
        const movedBlockIndex = edges.findIndex(edge => edge.node.ID === elementId);
        // Keep it
        const movedBlock = edges[movedBlockIndex];
        // Remove the moved block
        edges.splice(movedBlockIndex, 1);
        // If the target is 0, it's added to the start
        if (!afterElementId) {
          edges.unshift(movedBlock);
        } else {
          // Else, find the block we inserted after
          const targetBlockIndex = edges.findIndex(edge => edge.node.ID === afterElementId);
          // Add it back after the target
          const end = edges.slice(targetBlockIndex + 1);
          edges = edges.slice(0, targetBlockIndex + 1);
          edges.push(movedBlock);
          edges = edges.concat(end);
        }

        // Add it back to the full result
        newData.readOneElementalArea.Elements.edges = edges;
        store.writeQuery({ query: readAreaQuery, data: newData, variables });
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
