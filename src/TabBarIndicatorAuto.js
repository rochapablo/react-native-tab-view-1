/* @flow */

import * as React from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import Animated from 'react-native-reanimated';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { Route, SceneRendererProps, NavigationState } from './types';

export type Props<T> = {|
  ...SceneRendererProps,
  navigationState: NavigationState<T>,
  width: number,
  style?: ViewStyleProp,
  indicatorWidth: any,
|};

export default function TabBarIndicatorAuto<T: Route>(props: Props<T>) {
  const { width, position, navigationState, style, indicatorWidth } = props;
  const { routes } = navigationState;
  /* const translateX = Animated.multiply(
    Animated.multiply(
      Animated.interpolate(position, {
        inputRange: [0, routes.length - 1],
        outputRange: [0, routes.length - 1],
        extrapolate: 'clamp',
      }),
      width
    ),
    I18nManager.isRTL ? -1 : 1
  ); */
  let translateX = 0;
    for (let i = 0; i < navigationState.index; i++) {
      translateX = translateX + indicatorWidth[i];
    };
  console.log(translateX, width);
  return (
    <Animated.View
      style={[
        styles.indicator,
        // { width: `${100 / routes.length}%` },
        width,
        // If layout is not available, use `left` property for positioning the indicator
        // This avoids rendering delay until we are able to calculate translateX
        /* width
          ? { transform: [{ translateX }] }
          : { left: `${(100 / routes.length) * navigationState.index}%` }, */
        { transform: [{ translateX }] },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#ffeb3b',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
});
