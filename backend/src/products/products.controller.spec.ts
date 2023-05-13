import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ProductsController } from './products.controller';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsModule } from './products.module';

const createProductDto: CreateProductDto = {
  name: 'Product1',
  price: 10,
  category: 'C1',
  rating: 1,
};

const databaseConnection: SequelizeModuleOptions = {
  dialect: 'sqlite',
  omitNull: true,
  autoLoadModels: true,
  synchronize: true,
};

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const productsModuleTest: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forRoot(databaseConnection), ProductsModule],
    }).compile();

    controller = productsModuleTest.get<ProductsController>(ProductsController);
  });

  describe('Manage products', () => {
    it('should create a product', async () => {
      let response = await controller.create(createProductDto);
      const id = response.id;
      response = await controller.findOne(id);
      expect(response.name).toBe(createProductDto.name);
    });

    it('should update a product', async () => {
      let response = await controller.create(createProductDto);
      const id = response.id;
      createProductDto.name = 'Product1-updated';
      await controller.update(id, createProductDto);
      response = await controller.findOne(id);
      expect(response.name).toBe(createProductDto.name);
    });

    it('should remove a product', async () => {
      let response = await controller.create(createProductDto);
      const id = response.id;
      await controller.remove(id);
      response = await controller.findOne(id);
      expect(response).toBeNull();
    });

    it('should list all products', async () => {
      await controller.create(createProductDto);
      const response = await controller.findAll();
      expect(response.length).toBeGreaterThan(0);
    });

    it('should list products by criteria', async () => {
      await controller.create(createProductDto);
      const searchCriteria = { name: createProductDto.name };
      const response = await controller.findByCriteria(searchCriteria);
      expect(response.length).toBeGreaterThan(0);
    });
  });
});
