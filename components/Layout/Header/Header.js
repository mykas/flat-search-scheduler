import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #222;
  padding: 5px;
  margin: 0;
  color: white;
  font-size: 10pt;
  display: flex;
  justify-content: flex-start;
`;

const Header = () => <HeaderContainer>Hello there</HeaderContainer>;

export default Header;
