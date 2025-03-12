import { gql, request } from "graphql-request";
import { FetchShoppingItemsResponse, ShoppingItem } from "../types";

const API_URL = "http://localhost:4000/graphql";

export const fetchItems = async (): Promise<FetchShoppingItemsResponse> =>
  request(
    API_URL,
    gql`
      query {
        shoppingItems {
          id
          name
          quantity
          createdAt
        }
      }
    `
  );

export const addItem = async (
  createShoppingItemDto: Pick<ShoppingItem, "name" | "quantity">
) =>
  request(
    API_URL,
    gql`
      mutation ($createShoppingItemDto: CreateShoppingItemDto!) {
        createShoppingItem(createShoppingItemDto: $createShoppingItemDto) {
          id
          name
          quantity
          createdAt
        }
      }
    `,
    { createShoppingItemDto }
  );

export const deleteItem = async (id: string) =>
  request(
    API_URL,
    gql`
      mutation ($id: String!) {
        deleteShoppingItem(id: $id)
      }
    `,
    { id }
  );
