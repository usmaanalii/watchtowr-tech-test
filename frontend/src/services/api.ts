import { gql, request } from "graphql-request";

const API_URL = "http://localhost:4000/graphql";

export const fetchItems = async () =>
  request(
    API_URL,
    gql`
      query {
        shoppingItems {
          id
          name
          quantity
        }
      }
    `
  );
export const addItem = async (name: string, quantity: number) =>
  request(
    API_URL,
    gql`
      mutation ($name: String!, $quantity: Int!) {
        createShoppingItem(name: $name, quantity: $quantity) {
          id
          name
          quantity
        }
      }
    `,
    { name, quantity }
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
