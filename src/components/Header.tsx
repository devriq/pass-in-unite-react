import PassInLogo from "../assets/pass-in-logo.svg";
import Button from "../lib/Button";

type Props = {};

export function Header({}: Props) {
  return (
    <div className="flex justify-between py-2">
      <img className="p-2 pl-0" src={PassInLogo} />
      <nav className="flex-1 flex justify-start">
        <Button href="" label="Events"/>
        <Button href="" label="Attendees"/>
      </nav>
    </div>
  );
}
