import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const Provider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>{" "}
    </QueryClientProvider>
  );
};

export default Provider;
