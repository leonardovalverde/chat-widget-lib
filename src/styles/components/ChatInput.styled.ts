import { styled } from "../styled";
import type { Theme } from "../styled";

export const InputArea = styled("div")<{ theme: Theme }>`
  width: 100%;
  padding: ${(props) => props.theme.spacing.lg};
  border-top: 1px solid ${(props) => props.theme.colors.borderColor};
  background: ${(props) => props.theme.colors.inputAreaBg};
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const InputContainer = styled("div")`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

export const Input = styled("input")<{
  theme: Theme;
  customBg?: string;
  customColor?: string;
  customBorder?: string;
}>`
  flex: 1 1 0%;
  padding: 12px 16px;
  border: 1px solid
    ${(props) => props.customBorder || props.theme.colors.borderColor};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.typography.messageFontSize};
  line-height: 1.25;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background: ${(props) => props.customBg || props.theme.colors.inputBg};
  color: ${(props) => props.customColor || props.theme.colors.inputText};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-width: 0;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.inputPlaceholder};
    opacity: 1;
  }
`;

export const SendButton = styled("button")<{
  theme: Theme;
  gradient?: string;
}>`
  padding: 10px;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.15s ease-in-out;
  background: ${(props) =>
    props.gradient ||
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`};
  flex-shrink: 0;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: scale(1);
  }
`;
