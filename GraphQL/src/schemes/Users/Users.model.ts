import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field({ description: "The name of the user" })
  name: string;
}

export default User;
