import React from 'react';
import { Text, Layout } from 'react-native-ui-kitten';
import { BookInfo } from '../../components/BookInfo';

export const BookDetail = ({ book }) => {
  return <BookInfo book={{ book }} />;
};
