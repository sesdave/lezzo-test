const { Store, Category, Product } = require('../models');
const redisClient = require('../util/redisClient');
const io = require('socket.io')();
const fs = require('fs')
const s3Service = require('../services/s3Services')

exports.createStore = async (storeData, files) => {
  console.log("files", files)
  try {
    let store = new Store(storeData);
    if (files.image) {
      const photo = fs.readFileSync(files.image[0].filepath);
      const contentType = files.image[0].mimetype;
      const s3save = await s3Service.uploadImage(photo, contentType)
      if(s3save){
        store.image = s3save
      }
    }
    const newStore = await store.save();
    io.emit('newStore', newStore);
    await redisClient.set(`store:${newStore.id}`, JSON.stringify(newStore));
    return newStore;
  } catch (error) {
    console.error('Error creating store:', error);
    throw new Error('Failed to create store');
  }
};

exports.getStoreById = async (storeId) => {
    try {
      const cachedStore = await redisClient.get(`store:${storeId}`);
  
      if (cachedStore) {
        return JSON.parse(cachedStore);
      }
      const store = await Store.findByPk(storeId, {
        include: [
          {
            model: Category,
            include: Product 
          }
        ]
      });
  
      if (store) {
        await redisClient.set(`store:${storeId}`, JSON.stringify(store));
      }
      console.log("store", store)
  
      return store; 
    } catch (error) {
      console.error('Error fetching store:', error);
      throw new Error('Failed to fetch store');
    }
  };
  
  exports.getAllStoresWithCategoriesAndProducts = async () => {
    try {
      const stores = await Store.findAll({
        include:[
        {
            model: Category,
            include: Product 
        }
       ]
      });
  
      return stores; 
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw new Error('Failed to fetch stores');
    }
  };

  exports.updateByStoreId = async (storeId, storeData) => {
    try {
        const store = await Store.findByPk(storeId);
        if (!store) {
            throw new Error('Store not found');
        }

        Object.assign(store, storeData);
        const updateStore = await store.save();

        redisClient.del(`store:${storeId}`);
        return updateStore;
    } catch (error) {
        throw new Error('Error updating store');
    }
};

exports.deleteByStoreId = async (storeId) => {
    try {
        console.log("storeId", storeId )
        const store = await Store.findByPk(storeId);
        if (!store) {
            throw new Error('Store not found');
        }

        await store.destroy();

        redisClient.del(`store:${storeId}`);
        return { message: 'Store deleted successfully' };
    } catch (error) {
        console.log("Error deleting store", error)
        throw new Error('Error deleting store');
    }
};
