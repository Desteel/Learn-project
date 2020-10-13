import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany
} from "typeorm";
import { OrderProductEntity } from "./OrderProduct";

export interface Order {
  userId: string;
}

@Entity()
@ObjectType()
class OrderEntity extends BaseEntity implements Order {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  id: string;

  @PrimaryColumn()
  @Field(_type => ID)
  userId: string;

  @OneToMany(() => OrderProductEntity, product => product.order, {
    cascade: true
  })
  @Field(() => [OrderProductEntity])
  products: OrderProductEntity[];
}

export default OrderEntity;
