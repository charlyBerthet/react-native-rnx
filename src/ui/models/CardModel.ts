import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface CardModel {
  title: string;
  detail: string;
  subdetail: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  image: ImageSourcePropType;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  secondaryColor?: boolean;
  onLongPress?: () => void;
  isPremiumRequired?: boolean;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}
