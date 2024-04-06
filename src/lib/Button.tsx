import { PropsWithChildren, ReactNode } from "react";

interface ButtonProps extends PropsWithChildren {
    href?: string;
    label?: string;
    children?: ReactNode;
}

function Button({href, label, children}: ButtonProps) {
  return (
    <a href={href? href : ''} className="p-3 text-sm font-medium">{children}{label}</a>

  )
}

export default Button