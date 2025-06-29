import { useState } from "react";

/**
 * Custom hook to manage the minimized state of a component.
 * It provides methods to toggle, minimize, and maximize the component.
 */
export const useMinimizeState = (
  defaultMinimized: boolean = false,
  onToggleMinimize?: (isMinimized: boolean) => void
) => {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);

  const toggleMinimize = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    onToggleMinimize?.(newState);
    return newState;
  };

  const minimize = () => {
    setIsMinimized(true);
    onToggleMinimize?.(true);
  };

  const maximize = () => {
    setIsMinimized(false);
    onToggleMinimize?.(false);
  };

  return {
    isMinimized,
    toggleMinimize,
    minimize,
    maximize,
  };
};
