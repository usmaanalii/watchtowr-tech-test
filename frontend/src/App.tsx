import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShoppingList from "./components/shoppingList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ShoppingList />
  </QueryClientProvider>
);

export default App;
