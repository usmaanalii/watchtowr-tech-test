export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  createdAt: string;
}

export interface FetchShoppingItemsResponse {
  shoppingItems: ShoppingItem[];
}
