import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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

  return (
    <View style={[styles.root, props.style]}>
      <Svg height="50%" width="50%" viewBox="0 0 100 100" style={styles.svg}>
        <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" />
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
    height: 250,
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
