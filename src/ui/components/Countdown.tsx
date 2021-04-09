import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
  txtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpent: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  timeSpentPercentage: {
    fontSize: 14,
    fontWeight: '500',
  },
});
