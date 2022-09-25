import { Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
  const { tokens } = useTheme();

  return (
    <Image
      alt="logo"
      src="https://i.ibb.co/Ns5R5d8/team-swan-logo.png"
      padding={tokens.space.medium}
    />
  );
}
