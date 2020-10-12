import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { AddProductPayload } from "./Product.payloads";
import ProductEntity from "./Product.entity";

@Resolver()
class ProductsResolver {
  @Query(() => [ProductEntity])
  products() {
    return ProductEntity.find();
  }

  @Query(() => ProductEntity)
  product(@Arg("id") id: string) {
    return ProductEntity.findOne({ where: { id } });
  }

  @Mutation(() => ProductEntity)
  async addProduct(
    @Arg("data") data: AddProductPayload
  ): Promise<ProductEntity> {
    const product = ProductEntity.create(data);
    await product.save();

    return product;
  }
}

export default ProductsResolver;
