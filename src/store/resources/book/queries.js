import gql from 'graphql-tag';

export const queries = {
  GET_BOOK_BY_ISBN: gql`
    query getBookByISBN($ISBN: String!) {
      getBookByISBN(ISBN: $ISBN) {
        title
        author
        ISBN
      }
    }
  `,
};
