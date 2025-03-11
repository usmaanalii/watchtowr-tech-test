import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useShoppingList } from "../hooks/useShoppingList";

const ShoppingList = () => {
  const { items, isLoading, addItem, deleteItem } = useShoppingList();
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState("");

  return (
    <Box p={4} maxW="500px" mx="auto">
      <Stack spacing={3}>
        <Input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button onClick={() => addItem({ name, quantity: parseInt(quantity) })}>
          Add Item
        </Button>
      </Stack>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Stack mt={4}>
          {items.map((item) => (
            <Box key={item.id} p={3} shadow="md" borderWidth="1px">
              <Text fontWeight="bold">{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ShoppingList;
