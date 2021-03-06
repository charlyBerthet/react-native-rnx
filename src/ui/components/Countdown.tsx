import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme, useMainColors } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';
import { stringifyTimeMS, hoursDiff, daysDiff } from '../../utils';

interface Props extends CommonViewProps {
  startsAt: number;
  endsAt: number;
  timeSpentLabel: string;
  localizeTimeSpentPercentage: (percentage: string) => string;
  localizeHoursLeft: (hoursLeft: number) => string;
  localizeDaysLeft: (daysSpent: number, daysTotal: number) => string;
  secondary?: boolean;
}

const CIRCLE_STROKE_SIZE = 10;
const CIRCLE_RADIUS = 40;
const SIZE = Math.min(Dimensions.get('window').width - 30, 310);

export const Countdown = (props: Props) => {
  const [now, setNow] = useState(0);
  const theme = useTheme();
  const mainColors = useMainColors(props.secondary);
  const { startsAt, endsAt } = props;

  useEffect(() => {
    setNow(Date.now());
    const sub = setInterval(() => setNow(Date.now()), 250);
    return () => {
      clearInterval(sub);
    };
  }, []);

  const timeSpentPercentage = Math.round(
    ((now - startsAt) / (endsAt - startsAt)) * 100
  );

  const circleRadius = CIRCLE_RADIUS;
  const circleCirconf = 2 * Math.PI * circleRadius;
  const circleDashOffset =
    circleCirconf * (1 - Math.min(timeSpentPercentage, 100) / 100);

  return (
    <View style={[styles.root, props.style]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.svg}>
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={mainColors.bg}
          strokeWidth={CIRCLE_STROKE_SIZE}
          opacity={0.15}
        />
      </Svg>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        style={[styles.svg, styles.svgProgress]}
      >
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={mainColors.bg}
          strokeWidth={CIRCLE_STROKE_SIZE}
          strokeDasharray={circleCirconf}
          strokeDashoffset={circleDashOffset}
        />
      </Svg>
      <View style={[styles.txtContainer]}>
        <Text style={[styles.timeSpent, { color: theme.txtColor }]}>
          {props.timeSpentLabel}
        </Text>
        <Text style={[styles.title, { color: theme.txtColor }]}>
          {stringifyTimeMS(now - startsAt)}
        </Text>
        <Text style={[styles.timeSpentPercentage, { color: theme.txtColor }]}>
          {props.localizeTimeSpentPercentage(timeSpentPercentage + '')}
        </Text>
        <Text style={[styles.hoursLeft, { color: theme.txtColor }]}>
          {props.localizeHoursLeft(hoursDiff(now, endsAt))}
        </Text>
        <Text style={[styles.daysLeft, { color: theme.txtColor }]}>
          {props.localizeDaysLeft(
            daysDiff(startsAt, now, true),
            daysDiff(startsAt, endsAt)
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZE,
    width: SIZE,
  },
  svg: {
    position: 'absolute',
  },
  svgProgress: {
    transform: [{ rotate: '-90deg' }],
  },
  txtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpent: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 37,
    fontWeight: '700',
  },
  timeSpentPercentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  hoursLeft: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
    marginTop: 6,
  },
  daysLeft: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.7,
    marginTop: 2,
    marginBottom: -25,
  },
});
