import { useCallback, useEffect, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Easing, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import type { Config, State } from "./types";

export function useCollapsible(config: Config) {
  const [height, setHeight] = useState(0);
  const [state, setState] = useState<State>(
    config.state === "collapsed" ? "collapsed" : "expanded"
  );
  const [mounted, setMounted] = useState(config.state === "expanded");

  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    if (state === "collapsed") {
      animatedHeight.value = withTiming(
        0,
        {
          duration: 150,
          easing: Easing.out(Easing.ease)
        },
        () => runOnJS(setMounted)(false)
      );
    } else {
      animatedHeight.value = withTiming(
        height,
        {
          duration: 150,
          easing: Easing.out(Easing.ease)
        },
        () => runOnJS(setMounted)(true)
      );
    }
  }, [state, height, animatedHeight]);

  const onPress = useCallback(() => {
    setState((prev) => (prev === "collapsed" ? "expanded" : "collapsed"));
  }, []);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const measuredHeight = event.nativeEvent.layout.height;

      if (height !== measuredHeight) {
        setHeight(measuredHeight);
      }
    },
    [height]
  );

  return {
    animatedHeight,
    height,
    mounted,
    onLayout,
    onPress,
    setMounted,
    state
  };
}
