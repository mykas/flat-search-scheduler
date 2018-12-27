import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CellContainer = styled.div`
  margin: 10px 10px 0 10px;
  flex: 1 0 auto;
  align-self: ${props => (props.vertical ? 'center' : 'no')};
  grid-column: ${props => props.span};
`;

export const Cell = ({ span, children, vertical }) => (
  <CellContainer span={span} vertical={vertical} children={children} />
);

Cell.displayName = 'Cell';

Cell.propTypes = {
  /** any node to be rendered inside */
  children: PropTypes.node,

  /** how many columns should this cell occupy. Can be any number from 1 to 12 inclusive */
  span: PropTypes.number,

  /** whether to align children vertically to the middle */
  vertical: PropTypes.bool,
};

Cell.defaultProps = {
  span: 12,
};
