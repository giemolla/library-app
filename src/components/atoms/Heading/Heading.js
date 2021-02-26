import styled, { css } from "styled-components";

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  margin: 0;

  ${({ secondary }) =>
    secondary &&
    css`
      font-size: ${({ theme }) => theme.fontSize.m};
    `}

  ${({ tertiary }) =>
    tertiary &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
    `}
`;

export default Heading;
