import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// GraphQL query for deleting a specific block
const mutation = gql`
mutation AddElementToArea($className: String!, $elementalAreaID: ID!, $afterElementID: ID) {
  addElementToArea(
    ClassName: $className,
    ElementalAreaID: $elementalAreaID,
    AfterElementID: $afterElementID
  ) {
    ID
    Sort
    InlineEditable
  }
}
`;

const config = {
  props: ({ mutate, ownProps: { actions } }) => {
    const handleAddElementToArea = (className, elementalAreaID, afterElementID) => mutate({
      variables: { className, elementalAreaID, afterElementID },
    });

    return {
      actions: {
        ...actions,
        handleAddElementToArea,
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
