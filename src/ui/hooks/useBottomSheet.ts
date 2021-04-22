import type { BottomSheetOptionsProps } from '../components/BottomSheetOptions';
import type { BottomSheetActionsRef } from '../components/BottomSheet';

let actionsRef: BottomSheetActionsRef | undefined;

export const setActionsSheetRef = (
  _actionsRef: BottomSheetActionsRef | undefined
) => (actionsRef = _actionsRef);

export const useBottomSheet = () => {
  const showBottomSheetOptions = (props: BottomSheetOptionsProps) => {
    actionsRef?.show(props);
  };

  return { setActionsSheetRef, showBottomSheetOptions };
};
