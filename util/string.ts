export const classNames = (
  ...names: Array<string | undefined | false>
): string => names.filter((name) => !!name).join(" ");
