import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<'a'> {
}

export function NavLink(props: NavLinkProps) {
  return (
    <a {...props} className="p-3 text-sm font-medium disabled:opacity-40 disabled:border-none">{props.children}</a>

  )
}
