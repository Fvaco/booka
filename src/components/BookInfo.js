import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';

export const BookInfo = ({ book }) => {
  const { isbn } = book;
  return (
    <Layout>
      <Text>{isbn}</Text>
    </Layout>
  );
};
