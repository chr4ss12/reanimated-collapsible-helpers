import React, { memo, ReactNode } from "react";
import { LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import isEqual from "react-fast-compare";

import type { State } from "./types";

type Props = {
  animatedHeight: any;
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
  state: State;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
};

const AnimatedSection = ({ children, onLayout, animatedHeight, state, style }: Props) => {
  return (
    <Animated.View
      pointerEvents={state === "expanded" ? "auto" : "none"}
      style={[{ height: animatedHeight }, styles.overflowHidden]}
    >
      <Animated.View onLayout={onLayout} style={[styles.container, style]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  overflowHidden: {
    overflow: "hidden"
  }
});

export default memo(AnimatedSection, isEqual);
