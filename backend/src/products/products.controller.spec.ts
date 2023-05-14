import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  const productsService = new ProductsService(Product);
  const productsController = new ProductsController(productsService);

  it('should return an array of products', async () => {
    const mockedResponseData = [];
    jest
      .spyOn(productsService, 'findAll')
      .mockImplementation(() => Promise.resolve(mockedResponseData));
    expect(await productsController.findAll()).toBe(mockedResponseData);
  });

  it('should return an array of products by criteria', async () => {
    const mockedResponseData = [];
    const criteria = { id: '1' };
    jest
      .spyOn(productsService, 'findByCriteria')
      .mockImplementation(() => Promise.resolve(mockedResponseData));
    expect(await productsController.findByCriteria(criteria)).toBe(
      mockedResponseData,
    );
  });
});
