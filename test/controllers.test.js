const {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
  } = require('../controllers/products.controllers'); 
  
  const Product = require('../models/product');
  
  const mockProductData = [
    {
      product_id: 1,
      name: 'Product 1',
      category: 'Category A',
      price: 10,
      stock: 20,
    },
    {
      product_id: 2,
      name: 'Product 2',
      category: 'Category B',
      price: 15,
      stock: 25,
    },
  ];
  
  describe('getProducts', () => {
    it('should return a list of products', async () => {
      Product.find = jest.fn(() => mockProductData);
  
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await getProducts(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProductData);
    });
  });
  
  describe('getProduct', () => {
    it('should return a single product by product_id', async () => {
      const req = { params: { id: 1 } };
      Product.findOne = jest.fn(() => mockProductData[0]);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await getProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProductData[0]);
    });
  
    it('should return a 404 error if product not found', async () => {
      const req = { params: { id: 3 } };
      Product.findOne = jest.fn(() => null);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await getProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });
  });
  
  describe('addProduct', () => {
    it('should add a new product', async () => {
      const req = { body: mockProductData[0] };
      Product.findOne = jest.fn(() => null);
      Product.prototype.save = jest.fn(() => mockProductData[0]);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await addProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProductData[0]);
    });
  
    it('should return a 400 error if product_id already exists', async () => {
      const req = { body: mockProductData[0] };
      Product.findOne = jest.fn(() => mockProductData[0]);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await addProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product ID already exists' });
    });
  
    it('should return a 400 error if validation fails', async () => {
      const req = { body: { ...mockProductData[0], name: 'Short' } };
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await addProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: ['"name" length must be at least 8 characters long'] });
    });
  });
  
  describe('editProduct', () => {
    it('should edit an existing product', async () => {
      const req = { params: { id: 1 }, body: mockProductData[0] };
      Product.findOneAndUpdate = jest.fn(() => mockProductData[0]);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await editProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProductData[0]);
    });
  
    it('should return a 404 error if product not found', async () => {
      const req = { params: { id: 3 }, body: mockProductData[0] };
      Product.findOneAndUpdate = jest.fn(() => null);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await editProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });
  
    it('should return a 400 error if validation fails', async () => {
      const req = { params: { id: 1 }, body: { ...mockProductData[0], name: 'Short' } };
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await editProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: ['"name" length must be at least 8 characters long'] });
    });
  });
  
  describe('deleteProduct', () => {
    it('should delete an existing product', async () => {
      const req = { params: { id: 1 } };
      Product.findOneAndDelete = jest.fn(() => mockProductData[0]);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await deleteProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('ID : 1 is delete successfully');
    });
  
    it('should return a 404 error if product not found', async () => {
      const req = { params: { id: 3 } };
      Product.findOneAndDelete = jest.fn(() => null);
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      await deleteProduct(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ Error: 'Product not found' });
    });
  });
  