import { Tr, Td, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { ShoppingItem } from "../types";

interface Props {
  item: ShoppingItem;
  deleteItem: (id: string) => void;
}

const ShoppingListItem: React.FC<Props> = ({ item, deleteItem }) => {
  return (
    <Tr>
      <Td px={4} fontWeight="bold" scope="row">
        {item.name}
      </Td>
      <Td px={4}>{item.quantity}</Td>
      <Td px={4} fontSize="sm" color="gray.600">
        {new Date(item.createdAt).toLocaleString()}
      </Td>
      <Td px={4}>
        <IconButton
          size="sm"
          colorScheme="red"
          aria-label={`Delete ${item.name}`}
          cursor="pointer"
          icon={<DeleteIcon />}
          onClick={() => deleteItem(item.id)}
        />
      </Td>
    </Tr>
  );
};

export default ShoppingListItem;
