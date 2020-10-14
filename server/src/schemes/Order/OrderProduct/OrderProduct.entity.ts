import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne
} from "typeorm";
import OrderEntity from "../Order.entity";

export interface OrderProduct {
  productId: string;
  date: string;
  quantity: number;

  discount?: number;
  isPaid?: boolean;
  isShipped?: boolean;
}

@Entity()
@ObjectType()
class OrderProductEntity extends BaseEntity implements OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @PrimaryColumn()
  @Field({ description: "The id of the original product" })
  productId: string;

  @Column()
  @Field({ description: "The date added" })
  date: string;

  @Column()
  @Field({ description: "The quantity" })
  quantity: number;

  @Column()
  @Field(() => Int, { description: "The discount percent" })
  discount: number;

  @Column()
  @Field(() => Boolean, { description: "Is paid" })
  isPaid: boolean;

  @Column()
  @Field(() => Boolean, { description: "Is shipped" })
  isShipped: boolean;

  @ManyToOne(() => OrderEntity, order => order.products)
  order: OrderEntity;
}

export default OrderProductEntity;
