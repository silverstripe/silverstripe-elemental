import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { config as readBlocksConfig, query as readBlocksQuery } from './readBlocksForAreaQuery';

// GraphQL query for deleting a specific block
const mutation = gql`
mutation ArchiveBlock($blockId: ID!) {
  deleteBlock(IDs: [$blockId]) {
    ID
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleArchiveBlock = (blockId, areaId) => mutate({
      variables: { blockId },
      optimisticResponse: {
        deleteBlock: null, // Our deletes don't give responses...
      },
      update: store => {
        const variables = readBlocksConfig.options({ areaId }).variables;
        const cachedData = store.readQuery({ query: readBlocksQuery, variables });

        // Query returns a deeply nested object. Explicit reconstruction via spreads is too verbose.
        // This is an alternative, relatively efficient way to deep clone
        const newData = JSON.parse(JSON.stringify(cachedData));

        // Find our existing list of elements and our removed block within it
        const { edges } = newData.readOneElementalArea.Elements;
        const matchedIndex = edges.findIndex(candidate => candidate.node.ID === blockId);

        // Break out if we can't find our removed element
        if (matchedIndex < 0) {
          return;
        }

        // Remove the removed element
        edges.splice(matchedIndex, 1);

        // Set the data back to the query store
        newData.readOneElementalArea.Elements.edges = edges;
        store.writeQuery({ query: readBlocksQuery, data: newData, variables });
      }
    });

    return {
      actions: {
        ...actions,
        handleArchiveBlock,
      },
    };
  },
};

export { mutation, config };

export default graphql(mutation, config);
