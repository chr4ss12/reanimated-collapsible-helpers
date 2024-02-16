import { SharedValue } from "react-native-reanimated";

export declare type State = "expanded" | "collapsed";

export declare type Config = {
  duration?: number;
  easing?: any;
  mounted?: SharedValue<boolean>;
  show?: boolean | null | undefined;
  state?: string;
  unmountOnCollapse?: boolean | null | undefined;
};
