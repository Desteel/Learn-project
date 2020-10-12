import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

export interface User {
  name: string;
  email: string;

  phone?: number;
  subscriber?: string;
}

@Entity()
@ObjectType()
class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  @Field(_type => ID)
  id: string;

  @Column()
  @Field({ description: "The name of the user" })
  name: string;

  @Column()
  @Field({ description: "The email of the user" })
  email: string;

  @Column()
  @Field(() => Int, { description: "The phone of the user", nullable: true })
  phone?: number;

  @Column()
  @Field({ description: "The email of the user", nullable: true })
  subscriber?: string;
}

export default UserEntity;
