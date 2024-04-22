const API_URL = 'http://localhost:5000';
export const fetchAllStoresApi = async () => {
  try {
    const response = await fetch(`${API_URL}/stores`, {
      method: 'GET'
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Stores not found');
      } else {
        throw new Error('Failed to fetch stores');
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error; 
  }
};

export const addStoreToApi = async (storeData) => {
  console.log(`Entered Ready to post ${storeData.get('location')}`)
  try {
    const response = await fetch(`${API_URL}/stores`, {
      method: 'POST',
      body: storeData,
    });

    if (!response.ok) {
      throw new Error('Failed to post category');
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateStoreInApi = async (storeId, storeData) => {
  try {
    const response = await fetch(`${API_URL}/stores/${storeId}`, {
      method: 'PUT',
      body: storeData, 
    });

    if (!response.ok) {
      throw new Error('Failed to update store');
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteStoreToApi = async (storeId) => {
try {
  const response = await fetch(`${API_URL}/stores/${storeId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete store');
  }

  return storeId;
} catch (error) {
  throw error;
}
};
