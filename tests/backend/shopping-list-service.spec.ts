import { writeFileSync, readFileSync, existsSync } from "fs";
import { ShoppingListService } from "./shopping-list.service";
import { CreateShoppingItemDto } from "./dto/create-shopping-item.input.dto";

jest.mock("fs");
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("fake-uuid"),
}));

describe("ShoppingListService", () => {
  let shoppingListService: ShoppingListService;

  beforeEach(() => {
    shoppingListService = new ShoppingListService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return an empty array if no data file exists", () => {
      (existsSync as jest.Mock).mockReturnValue(false);

      const result = shoppingListService.findAll();

      expect(result).toEqual([]);
    });

    it("should return data from the file if it exists", () => {
      const mockData = [{ id: "1", name: "Apple", quantity: 5 }];
      (existsSync as jest.Mock).mockReturnValue(true);
      (readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));

      const result = shoppingListService.findAll();

      expect(result).toEqual(mockData);
    });
  });

  describe("create", () => {
    it("should create a new shopping item and write it to the file", () => {
      const createShoppingItemDto: CreateShoppingItemDto = {
        name: "Banana",
        quantity: 3,
      };

      const mockData = [{ id: "1", name: "Apple", quantity: 5 }];
      (existsSync as jest.Mock).mockReturnValue(true);
      (readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));
      (writeFileSync as jest.Mock).mockImplementationOnce(() => {});

      const result = shoppingListService.create(createShoppingItemDto);

      expect(result).toEqual({
        id: "fake-uuid",
        name: "Banana",
        quantity: 3,
        createdAt: expect.any(String), // The createdAt should be any string (date string)
      });
    });
  });

  describe("delete", () => {
    it("should delete an item by id and update the data file", () => {
      const mockData = [
        { id: "1", name: "Apple", quantity: 5 },
        { id: "2", name: "Banana", quantity: 3 },
      ];
      (existsSync as jest.Mock).mockReturnValue(true);
      (readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockData));
      (writeFileSync as jest.Mock).mockImplementationOnce(() => {});

      const result = shoppingListService.delete("1");

      expect(result).toEqual("1");
    });
  });
});
