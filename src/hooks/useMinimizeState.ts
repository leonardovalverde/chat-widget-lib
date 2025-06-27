import { useState } from "react";

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
