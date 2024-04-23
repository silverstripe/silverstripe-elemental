import gql from 'graphql-tag';

// note that unlike other mutations under state/editor, this one does not follow the
// old HOC pattern, instead it used the newer useMutation() hook in Element.js

export const publishBlockMutation = gql`
mutation PublishBlock($blockId:ID!) {
  publishBlock(id: $blockId) {
    id
  }
}
`;
