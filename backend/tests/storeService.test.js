const { createStore, getStoreById, getAllStoresWithCategoriesAndProducts, updateByStoreId, deleteByStoreId } = require('../src/services/storeService');
const { Store, Category, Product } = require('../src/models');
const redisClient = require('../src/util/redisClient');
const fs = require('fs');
const s3Service = require('../src/services/s3Services');

jest.mock('../src/models', () => ({
    Store: {
        findByPk: jest.fn(),
        findAll: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
    Category: {
        findByPk: jest.fn(),
    },
    Product: {
        findByPk: jest.fn(),
    },
}));

jest.mock('../src/util/redisClient');
jest.mock('fs');
jest.mock('../src/services/s3Services');

describe('storeService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createStore', () => {
        it('should create a new store', async () => {
            const storeData = { name: 'Test Store', location:'Test' };
            const files = { image: [{ filepath: '/path/to/image', mimetype: 'image/jpeg' }] };
            const mockStore = { id: 1, ...storeData };
            const mockS3Save = 'https://example.com/image.jpg';

            fs.readFileSync.mockReturnValue(Buffer.from('test image'));
            s3Service.uploadImage.mockResolvedValue(mockS3Save);
            Store.save.mockResolvedValue(mockStore);

            const result = await createStore(storeData, files);

            expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/image');
            expect(s3Service.uploadImage).toHaveBeenCalledWith(Buffer.from('test image'), 'image/jpeg');
            expect(Store.save).toHaveBeenCalledWith(expect.objectContaining(storeData));
            expect(redisClient.set).toHaveBeenCalledWith(`store:${mockStore.id}`, JSON.stringify(mockStore));
            expect(result).toEqual(mockStore);
        });

        it('should throw an error if store creation fails', async () => {
            const storeData = { name: 'Test Store' };
            const files = { image: [{ filepath: '/path/to/image', mimetype: 'image/jpeg' }] };
            const error = new Error('Failed to create store');

            fs.readFileSync.mockReturnValue(Buffer.from('test image'));
            s3Service.uploadImage.mockResolvedValue(null);
            Store.save.mockRejectedValue(error);

            await expect(createStore(storeData, files)).rejects.toThrow(error);
        });
    });

    describe('getStoreById', () => {
        it('should return a store by ID', async () => {
            const storeId = 1;
            const mockStore = { id: storeId, name: 'Test Store' };
            const mockCachedStore = JSON.stringify(mockStore);

            redisClient.get.mockResolvedValue(mockCachedStore);
            Store.findByPk.mockResolvedValue(mockStore);

            const result = await getStoreById(storeId);

            expect(redisClient.get).toHaveBeenCalledWith(`store:${storeId}`);
            expect(Store.findByPk).toHaveBeenCalledWith(storeId, { include: [{ model: Category, include: Product }] });
            expect(result).toEqual(mockStore);
        });

        it('should fetch store from database if not cached', async () => {
            const storeId = 1;
            const mockStore = { id: storeId, name: 'Test Store' };

            redisClient.get.mockResolvedValue(null);
            Store.findByPk.mockResolvedValue(mockStore);

            const result = await getStoreById(storeId);

            expect(redisClient.get).toHaveBeenCalledWith(`store:${storeId}`);
            expect(Store.findByPk).toHaveBeenCalledWith(storeId, { include: [{ model: Category, include: Product }] });
            expect(redisClient.set).toHaveBeenCalledWith(`store:${storeId}`, JSON.stringify(mockStore));
            expect(result).toEqual(mockStore);
        });

        it('should throw an error if store retrieval fails', async () => {
            const storeId = 1;
            const error = new Error('Failed to fetch store');

            redisClient.get.mockResolvedValue(null);
            Store.findByPk.mockRejectedValue(error);

            await expect(getStoreById(storeId)).rejects.toThrow(error);
        });
    });

});
