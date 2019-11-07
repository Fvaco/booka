import React from 'react';
import { Layout, List, Button, Icon } from 'react-native-ui-kitten';
import { light } from '@eva-design/eva'; // <-- Import both Light and Dark themes
import styled from 'styled-components/native';
import { name, commerce } from 'faker';

import { BookListItem } from './components/BookListItem';
import { ROUTER_KEY_BOOK_SCANNER } from '../BookScanner';

export const ROUTER_KEY_BOOK_LIST = 'BookList';

const getRandomNumber = (maxValue = 1) => Math.round(Math.random() * maxValue);
const MOCK_ELEMENTS_COUNT = 20;
const BOOK_LIST_MOCK = new Array(MOCK_ELEMENTS_COUNT)
  .fill(0)
  .map((_, index) => ({
    id: `book_${index}`,
    title: commerce.productName(),
    author: name.findName(),
    image: `https://picsum.photos/70/100?${Math.random()}`,
    genres: [commerce.productAdjective(), commerce.productAdjective()],
  }));

export const BookList = ({ navigation }) => {
  const renderItem = ({ item: { title, author, image } }) => (
    <BookListItem title={title} subtitle={author} image={image} />
  );
  const BarcodeIcon = style => {
    console.log(light);
    return <Icon style={{ ...style, width: 'auto' }} name="barcode-scan" />;
  };
  return (
    <StyledScreenLayout>
      <List
        data={BOOK_LIST_MOCK}
        ListFooterComponent={<StyledFooterLayout />}
        renderItem={renderItem}
      />
      <StyledFloatingButton
        icon={BarcodeIcon}
        appearance="primary"
        onPress={() => navigation.navigate(ROUTER_KEY_BOOK_SCANNER)}
        size="large"
        status="primary">
        Scan book ISBN
      </StyledFloatingButton>
    </StyledScreenLayout>
  );
};

BookList.navigationOptions = () => ({
  title: 'My Books List',
});

const StyledScreenLayout = styled(Layout)`
  flex: 1;
`;
const StyledFloatingButton = styled(Button)`
  display: flex;
  align-self: center;
  align-items: center;
  position: absolute;
  bottom: 20;
  border-radius: 50;
`;

const StyledFooterLayout = styled(Layout)`
  margin-bottom: 80;
`;
