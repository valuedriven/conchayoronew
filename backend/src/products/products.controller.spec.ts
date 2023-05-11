import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('create product', () => {
    it('should create a product', async () => {
      const productName = `Product ${Math.random()}`;
      const product = { name: productName };
      const response = await controller.create(product);
      expect(response.name).toBe(product.name);
    });
  });
});
