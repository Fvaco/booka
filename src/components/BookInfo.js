import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';

export const BookInfo = ({ book, loading }) => {
  if (!book) return <Text>Book not found </Text>;

  const { title, author, ISBN } = book;
  return (
    <Layout>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Text>{ISBN}</Text>
    </Layout>
  );
};
