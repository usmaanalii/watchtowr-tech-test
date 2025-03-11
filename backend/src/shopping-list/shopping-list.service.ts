import { Injectable } from "@nestjs/common";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const DATA_FILE = join(__dirname, "..", "data.json");

@Injectable()
export class ShoppingListService {
  private readData() {
    if (!existsSync(DATA_FILE)) return [];
    return JSON.parse(readFileSync(DATA_FILE, "utf8"));
  }

  private writeData(data: any) {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  }

  findAll() {
    return this.readData();
  }

  create(name: string, quantity: number) {
    const data = this.readData();
    const newItem = {
      id: uuidv4(),
      name,
      quantity,
    };
    data.push(newItem);
    this.writeData(data);
    return newItem;
  }

  delete(id: string) {
    let data = this.readData();
    data = data.filter((item: any) => item.id !== id);
    this.writeData(data);
    return id;
  }
}
