import type BottomSheet from 'reanimated-bottom-sheet';

let sheetRef: BottomSheet;

export const setSheetRef = (_sheetRef: BottomSheet) => (sheetRef = _sheetRef);

export const useBottomSheet = () => {
  const showBottomSheet = () => {
    sheetRef.snapTo(0);
  };

  const showBottomSheetOptions = () => {
    showBottomSheet();
  };

  return { showBottomSheetOptions };
};
