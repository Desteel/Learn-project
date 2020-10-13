import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { OrderProductEntity } from "./OrderProduct";

export interface Order {
  userId: string;
}

@Entity()
@ObjectType()
class OrderEntity extends BaseEntity implements Order {
  @PrimaryColumn()
  @Field(_type => ID)
  userId: string;

  @OneToMany(() => OrderProductEntity, product => product.order, {
    cascade: ["insert"]
  })
  @Field(() => [OrderProductEntity])
  products: OrderProductEntity[];
}

export default OrderEntity;
