import gql from 'graphql-tag';

export const publishBlockMutation = gql`
mutation PublishBlock($blockId:ID!) {
  publishBlock(id: $blockId) {
    id
  }
}
`;
