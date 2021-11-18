import type { BottomSheetOptionsProps } from '../components/BottomSheetOptions';
import type {
  BottomSheetActionsRef,
  BottomSheetProps,
} from '../components/BottomSheet';

let actionsRef: BottomSheetActionsRef | undefined;

export const setActionsSheetRef = (
  _actionsRef: BottomSheetActionsRef | undefined
) => (actionsRef = _actionsRef);

export const useBottomSheet = () => {
  const showBottomSheetOptions = (props: BottomSheetOptionsProps) => {
    actionsRef?.showOptions(props);
  };

  const show = (props: BottomSheetProps) => {
    actionsRef?.show(props);
  };

  const hideBottomSheet = () => actionsRef?.hide();

  return { setActionsSheetRef, showBottomSheetOptions, hideBottomSheet, show };
};
