import { TanStackProvider } from "./tanstack-provider";

const ReactQueryProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <TanStackProvider>{children}</TanStackProvider>;
};

export default ReactQueryProvider;
