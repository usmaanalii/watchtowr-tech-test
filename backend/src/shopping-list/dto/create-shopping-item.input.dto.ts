import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsInt, Min, Max } from "class-validator";

@InputType()
export class CreateShoppingItemDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  quantity: number;
}
