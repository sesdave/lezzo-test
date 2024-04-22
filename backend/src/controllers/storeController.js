const storeService = require('../services/storeService');
const { parseFormData } = require('../util/helper');

exports.createStore = async (req, res) => {
  try {
    const { fields, files } = await parseFormData(req);
    const { name, location } = fields;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const store = { name: name[0], location: location[0] };
    const newStore = await storeService.createStore(store, files);
    res.status(201).json(newStore);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ error: 'Failed to create store' });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeService.getAllStoresWithCategoriesAndProducts();
    res.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await storeService.getStoreById(storeId);
    if (store) {
      res.json(store);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ error: 'Failed to fetch store' });
  }
};

exports.updateStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { fields, files } = await parseFormData(req);
    const { name, location } = fields;
    
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const updatedFields = { name: name[0], location: location[0] };
    const updatedStore = await storeService.updateByStoreId(storeId, updatedFields);
    if (updatedStore) {
      res.json(updatedStore);
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ error: 'Failed to update store' });
  }
};

exports.deleteStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const deletedStore = await storeService.deleteByStoreId(storeId);
    if (deletedStore) {
      res.json({ message: 'Store deleted successfully' });
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ error: 'Failed to delete store' });
  }
};
