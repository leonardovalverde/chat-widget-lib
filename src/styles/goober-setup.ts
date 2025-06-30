import { setup } from "goober";
import { createElement } from "react";

const UNIQUE_PREFIX = "leosaichat-";

const customPrefixer = (key: string, value: string) => `${key}: ${value};\n`;

setup(
  createElement,
  customPrefixer,
  (className: string) => `${UNIQUE_PREFIX}-${className}`
);
