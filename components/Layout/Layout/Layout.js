import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;
export const Layout = ({ children, gap, cols }) => (
  <Container
    style={{
      gridGap: gap,
      gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : undefined,
    }}
    children={children}
  />
);

Layout.displayName = 'Layout';

Layout.propTypes = {
  /** one or more Cell components. Other nodes are accepted although not recommended */
  children: PropTypes.node,

  /** distance between cells both vertically and horizontally */
  gap: PropTypes.string,

  /** set custom amount of columns to be rendered. Default is 12 which means at `<Cell span={12}/>` occupies all columns, in other words, full width */
  cols: PropTypes.number,
};

Layout.defaultProps = {
  gap: '30px',
};
