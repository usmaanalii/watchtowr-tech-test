import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ShoppingListService } from "./shopping-list.service";
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";

@ObjectType()
class ShoppingItemType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  quantity: number;
}

@Resolver(() => ShoppingItemType)
export class ShoppingListResolver {
  constructor(private shoppingListService: ShoppingListService) {}

  @Query(() => [ShoppingItemType])
  shoppingItems() {
    return this.shoppingListService.findAll();
  }

  @Mutation(() => ShoppingItemType)
  createShoppingItem(
    @Args("name", { type: () => String }) name: string,
    @Args("quantity", { type: () => Int }) quantity: number
  ) {
    return this.shoppingListService.create(name, quantity);
  }

  @Mutation(() => String)
  deleteShoppingItem(@Args("id", { type: () => String }) id: string) {
    return this.shoppingListService.delete(id);
  }
}
