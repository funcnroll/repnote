import { MouseEventHandler } from "react";

export interface TemplateButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}
