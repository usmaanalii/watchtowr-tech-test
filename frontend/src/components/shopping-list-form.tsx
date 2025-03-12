import { useState } from "react";
import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import { ShoppingItem } from "../types";

interface Props {
  addItem: (item: Pick<ShoppingItem, "name" | "quantity">) => void;
}

const ShoppingListForm: React.FC<Props> = ({ addItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !quantity.trim()) {
      toast({
        title: "Both fields are required!",
        status: "warning",
        duration: 2000,
      });

      return;
    }

    addItem({ name, quantity: parseInt(quantity) });
    toast({ title: "Item added!", status: "success", duration: 2000 });
    setName("");
    setQuantity("");
  };

  return (
    <HStack spacing={3} mb={4}>
      <Input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="filled"
      />
      <Input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        variant="filled"
        width="100px"
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Add
      </Button>
    </HStack>
  );
};

export default ShoppingListForm;
