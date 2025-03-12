import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import ShoppingList from "./components/shopping-list";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ShoppingList />
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
