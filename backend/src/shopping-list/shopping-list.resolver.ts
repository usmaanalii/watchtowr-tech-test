import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ShoppingListService } from "./shopping-list.service";
import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { CreateShoppingItemDto } from "./dto/create-shopping-item.input.dto";
import { UsePipes, ValidationPipe } from "@nestjs/common";

@ObjectType()
class ShoppingItemType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  quantity: number;

  @Field()
  createdAt: string;
}

@Resolver(() => ShoppingItemType)
export class ShoppingListResolver {
  constructor(private shoppingListService: ShoppingListService) {}

  @Query(() => [ShoppingItemType])
  shoppingItems() {
    return this.shoppingListService.findAll();
  }

  @Mutation(() => ShoppingItemType)
  @UsePipes(new ValidationPipe({ transform: true }))
  createShoppingItem(
    @Args("createShoppingItemDto") createShoppingItemDto: CreateShoppingItemDto
  ) {
    return this.shoppingListService.create(createShoppingItemDto);
  }

  @Mutation(() => String)
  deleteShoppingItem(@Args("id", { type: () => String }) id: string) {
    return this.shoppingListService.delete(id);
  }
}
