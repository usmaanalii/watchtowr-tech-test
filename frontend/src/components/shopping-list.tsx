import { Box } from "@chakra-ui/react";
import ShoppingListForm from "./shopping-list-form";
import ShoppingListTable from "./shopping-list-table";
import { useShoppingList } from "../hooks/useShoppingList";

const ShoppingList = () => {
  const { items, isLoading, addItem, deleteItem } = useShoppingList();

  return (
    <Box
      p={6}
      maxW="600px"
      mx="auto"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <ShoppingListForm addItem={addItem} />
      <ShoppingListTable
        items={items}
        isLoading={isLoading}
        deleteItem={deleteItem}
      />
    </Box>
  );
};

export default ShoppingList;
