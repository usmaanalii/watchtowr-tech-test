import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import ShoppingListItem from "./shopping-list-item";
import { ShoppingItem } from "../types";

interface Props {
  items: ShoppingItem[];
  isLoading: boolean;
  deleteItem: (id: string) => void;
}

const ShoppingListTable: React.FC<Props> = ({
  items,
  isLoading,
  deleteItem,
}) => {
  return (
    <TableContainer>
      <Table variant="simple" aria-label="Shopping List Table">
        <Thead bg="gray.100">
          <Tr>
            <Th textAlign="left" px={4} scope="col">
              Item
            </Th>
            <Th textAlign="left" px={4} scope="col">
              Quantity
            </Th>
            <Th textAlign="left" px={4} scope="col">
              Created At
            </Th>
            <Th textAlign="left" px={4} scope="col">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i} aria-hidden="true">
                <Td px={4}>
                  <Skeleton height="20px" />
                </Td>
                <Td px={4}>
                  <Skeleton height="20px" />
                </Td>
                <Td px={4}>
                  <Skeleton height="20px" />
                </Td>
                <Td px={4}>
                  <Skeleton height="20px" width="30px" />
                </Td>
              </Tr>
            ))
          ) : items.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Text color="gray.500">No items in the list</Text>
              </Td>
            </Tr>
          ) : (
            items.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
              />
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingListTable;
