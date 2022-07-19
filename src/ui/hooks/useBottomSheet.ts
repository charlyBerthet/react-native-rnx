import type { BottomSheetOptionsProps } from '../components/BottomSheetOptions';
import type {
  BottomSheetActionsRef,
  BottomSheetProps,
} from '../components/BottomSheet';
import { useCallback } from 'react';

let actionsRef: BottomSheetActionsRef | undefined;

export const setActionsSheetRef = (
  _actionsRef: BottomSheetActionsRef | undefined
) => (actionsRef = _actionsRef);

export const useBottomSheet = () => {
  const showBottomSheetOptions = useCallback(
    (props: BottomSheetOptionsProps) => {
      actionsRef?.showOptions(props);
    },
    []
  );

  const show = useCallback((props: BottomSheetProps) => {
    actionsRef?.show(props);
  }, []);

  const hideBottomSheet = useCallback(() => actionsRef?.hide(), []);

  return {
    setActionsSheetRef,
    showBottomSheetOptions,
    hideBottomSheet,
    show,
    showBottomSheet: show,
  };
};
