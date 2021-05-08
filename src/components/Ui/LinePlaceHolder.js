import React, { memo } from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const LinePlaceHolder = ({ customStyle = {} }) => {
  return (
    <SkeletonPlaceholder>
      <View style={[{ width: 60, height: 14, borderRadius: 2 }, customStyle]} />
    </SkeletonPlaceholder>
  );
};

export default memo(LinePlaceHolder);
