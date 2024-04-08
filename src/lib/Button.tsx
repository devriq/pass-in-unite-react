import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<'button'> {
    href?: string;
    label?: string;
    children?: ReactNode;
}

function Button(props: ButtonProps) {
  return (
    <button {...props} className="p-3 text-sm font-medium disabled:opacity-40 disabled:border-none">{props.children}{props.label}</button>

  )
}

export default Button