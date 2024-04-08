import PassInLogo from "../assets/pass-in-logo.svg";
import { NavLink } from "../lib/NavLink";

type Props = {};

export function Header({}: Props) {
  return (
    <div className="flex justify-between py-2">
      <img className="p-2 pl-0" src={PassInLogo} />
      <nav className="flex-1 flex justify-start">
        <NavLink href="">Events</NavLink>
        <NavLink href="">Atendees</NavLink>
      </nav>
    </div>
  );
}
