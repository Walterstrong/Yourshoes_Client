import React from "react";
import styled from "styled-components";

export interface IMarginerProps {
  width?: string;
  height?: string;
  direction?: "horizontal" | "vertical";
  bg?: string;
}

const HorizontalMargin = styled.span<IMarginerProps>`
  display: flex;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ bg }) => `${bg}`};
`;

const VerticalMargin = styled.span<IMarginerProps>`
  display: flex;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ bg }) => `${bg}`};
`;

function Marginer(props: IMarginerProps) {
  const { direction } = props;
  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export default Marginer;
