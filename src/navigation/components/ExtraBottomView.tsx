interface Props {
  children?: JSX.Element;
  hiddenForScreenNames?: string[];
}

export function ExtraBottomView({ children }: Props) {
  return children || null;
}
