import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchItems, addItem, deleteItem } from "../services/api";
import { FetchShoppingItemsResponse } from "../types";

export const useShoppingList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<FetchShoppingItemsResponse>({
    queryKey: ["shoppingItems"],
    queryFn: fetchItems,
  });

  const addMutation = useMutation({
    mutationFn: ({ name, quantity }: { name: string; quantity: number }) =>
      addItem({ name, quantity }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shoppingItems"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shoppingItems"] }),
  });

  return {
    items: data?.shoppingItems || [],
    isLoading,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
  };
};
