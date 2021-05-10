import React, { memo } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

import { colors } from "../../style/GlobalStyle";

const LinePlaceHolder = ({ width = 100, height = 20, borderRadius = 2 }) => {
  return (
    <ContentLoader
      speed={1}
      width={width}
      height={30}
      viewBox={`0 0 ${width} 30`}
      backgroundColor={colors.tabIndicator}
      foregroundColor="#ecebeb"
    >
      <Rect
        x="0"
        y="10"
        rx={borderRadius}
        ry={borderRadius}
        width={width}
        height={height}
      />
    </ContentLoader>
  );
};

export default memo(LinePlaceHolder);
