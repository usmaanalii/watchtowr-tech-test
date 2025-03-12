import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { server } from "./mocks/server";
import { graphql } from "msw";

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  );

test("renders the shopping list", async () => {
  renderApp();

  expect(screen.queryByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(/no items in the list/i)).toBeInTheDocument();
  });
});

test("adds an item to the shopping list", async () => {
  server.use(
    graphql.mutation("AddShoppingItem", (req, res, ctx) => {
      const { name, quantity } = req.variables;
      return res(
        ctx.status(200),
        ctx.data({
          addShoppingItem: {
            id: "2",
            name,
            quantity,
            createdAt: new Date().toISOString(),
          },
        })
      );
    })
  );

  renderApp();

  await waitFor(() => {
    expect(screen.queryByText(/no items in the list/i)).toBeInTheDocument();
  });

  await userEvent.type(screen.getByPlaceholderText(/item name/i), "Milk");
  await userEvent.type(screen.getByPlaceholderText(/quantity/i), "2");

  userEvent.click(screen.getByRole("button", { name: /add/i }));

  await waitFor(() => {
    expect(screen.queryByText(/milk/i)).toBeInTheDocument();
    expect(screen.queryByText(/2/i)).toBeInTheDocument();
  });
});

test("deletes an item from the shopping list", async () => {
  server.use(
    graphql.query("GetShoppingItems", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.data({
          shoppingItems: [
            {
              id: "1",
              name: "Milk",
              quantity: 2,
              createdAt: new Date().toISOString(),
            },
          ],
        })
      );
    }),

    graphql.mutation("DeleteShoppingItem", (req, res, ctx) => {
      const { id } = req.variables;
      return res(
        ctx.status(200),
        ctx.data({
          deleteShoppingItem: {
            id,
          },
        })
      );
    })
  );

  renderApp();

  await waitFor(() => {
    expect(screen.queryByText(/milk/i)).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole("button", { name: /delete milk/i }));

  await waitFor(() => {
    expect(screen.queryByText(/milk/i)).not.toBeInTheDocument();
  });
});
