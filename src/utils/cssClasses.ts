export const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export const getWidgetClasses = (
  isFloating: boolean,
  floatingPosition: string,
  isMinimized: boolean,
  containerClassName: string
): string => {
  return combineClasses(
    "chat-leos-widget",
    isFloating && `chat-leos-widget-floating ${floatingPosition}`,
    isMinimized && "chat-leos-widget-minimized",
    containerClassName
  );
};
