import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

export interface Product {
  name: string;
  quantity: number;
  manufacturer: string;
  description: string;
  content: string;
  price: number;

  discount?: number;
}

@Entity()
@ObjectType()
class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  id: string;

  @Column()
  @Field({ description: "The name of the product" })
  name: string;

  @Column()
  @Field(() => Int, { description: "The quantity" })
  quantity: number;

  @Column()
  @Field({ description: "The manufacturer" })
  manufacturer: string;

  @Column()
  @Field({ description: "The description" })
  description: string;

  @Column()
  @Field({ description: "The content" })
  content: string;

  @Column()
  @Field(() => Int, { description: "The price" })
  price: number;

  @Column()
  @Field(() => Int, { description: "The discount", nullable: true })
  discount?: number;
}

export default ProductEntity;
