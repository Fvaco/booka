import React from 'react';
import styled from 'styled-components/native';
import { Layout, Text } from 'react-native-ui-kitten';
import { light } from '@eva-design/eva'; // <-- Import both Light and Dark themes

export const BookListItem = ({ title, subtitle, image }) => {
  return (
    <StyledListItem>
      <StyledItemImageWrapper>
        {!!image && (
          <StyledImage resizeMode="contain" source={{ uri: image }} />
        )}
      </StyledItemImageWrapper>
      <StyledContentWrapper>
        <Text>{title}</Text>
        <StyledTextSubtitle>{subtitle}</StyledTextSubtitle>
      </StyledContentWrapper>
    </StyledListItem>
  );
};

const StyledListItem = styled(Layout)`
  flex-direction: row;
  align-items: center;
  height: 100;
  margin-bottom: 5;
`;
const StyledItemImageWrapper = styled(Layout)`
  justify-content: center;
  background-color: whitesmoke;
  width: 100;
  height: 100;
`;
const StyledImage = styled.Image`
  width: 100;
  height: 90;
`;

const StyledContentWrapper = styled(Layout)`
  padding: 0px 3px 0 8px;
`;
const StyledTextSubtitle = styled(Text)`
  font-size: 14;
  color: ${light['color-basic-700']};
`;
