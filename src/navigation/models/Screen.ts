import type { GestureDirection } from '@react-navigation/stack/lib/typescript/src/types';

export default interface Screen {
  name: string;
  component: React.ComponentType<any>;
  title?: string;
  presentation?: 'modal' | 'transparentModal' | 'card' | undefined;
  headerShown?: boolean;
  gestureDirection?: GestureDirection;
}
