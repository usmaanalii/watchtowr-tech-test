import { setupServer } from "msw/node";
import { graphql } from "msw";

export const server = setupServer(
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
