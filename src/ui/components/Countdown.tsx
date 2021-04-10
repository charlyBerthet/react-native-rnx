import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';
import { stringifyTimeMS, addZero } from '../../utils';

interface Props extends CommonViewProps {
  startsAt: number;
  endsAt: number;
  timeSpentLabel: string;
  timeSpentPercentageLabel: string;
}

const SIZE = Math.min(Dimensions.get('window').width - 40, 250);

export const Countdown = (props: Props) => {
  const [now, setNow] = useState(0);
  const theme = useTheme();
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

  const circleRadius = 45;
  const circleCirconf = 2 * Math.PI * circleRadius;
  const circleDashOffset = circleCirconf * (1 - timeSpentPercentage / 100);

  console.log('>>>', circleRadius, circleCirconf, circleDashOffset);

  return (
    <View style={[styles.root, props.style]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" style={styles.svg}>
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={theme.primaryColor}
          strokeWidth="10"
          opacity="0.15"
        />
        <Circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke={theme.primaryColor}
          strokeWidth="10"
          strokeDasharray={circleCirconf}
          strokeDashoffset={circleDashOffset}
          rotation="0"
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
          {`${props.timeSpentPercentageLabel} ${addZero(timeSpentPercentage)}%`}
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
  txtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpent: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  timeSpentPercentage: {
    fontSize: 14,
    fontWeight: '500',
  },
});
