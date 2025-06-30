import { styled } from "../styled";
import type { Theme } from "../styled";

export const InputArea = styled("div")<{ theme: Theme }>`
  border-top: 1px solid ${(props) => props.theme.colors.borderColor};
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.inputAreaBg};
  flex-shrink: 0;

  /* 📱 RESPONSIVIDADE */
  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing.sm};
  }
`;

export const InputContainer = styled("div")`
  display: flex;
  gap: 8px;
  align-items: center;

  /* 📱 RESPONSIVIDADE */
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const Input = styled("input")<{
  theme: Theme;
  customBg?: string;
  customColor?: string;
}>`
  flex: 1 1 0%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.messageFontSize};
  line-height: 1.25;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background: ${(props) => props.customBg ?? props.theme.colors.inputBg};
  color: ${(props) => props.customColor ?? props.theme.colors.inputText};
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

  /* 📱 RESPONSIVIDADE */
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: ${(props) => props.theme.borderRadius.md};
  }

  @media (max-width: 320px) {
    padding: 6px 10px;
    font-size: 13px;
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
    props.gradient ??
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

  /* 📱 RESPONSIVIDADE */
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    padding: 8px;
  }

  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    padding: 6px;
  }
`;
