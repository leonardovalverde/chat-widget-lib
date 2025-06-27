import { type CSSProperties } from "react";

/**
 * Style configuration for components
 */
export interface StyleConfig {
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  messageStyle?: CSSProperties;
  userMessageStyle?: CSSProperties;
  inputStyle?: CSSProperties;
}

/**
 * CSS class configuration for components
 */
export interface ClassConfig {
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  messageClassName?: string;
  userMessageClassName?: string;
  inputClassName?: string;
}
