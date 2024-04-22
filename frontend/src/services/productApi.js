const API_URL = 'http://localhost:5000'; 

export const postProductToApi = async (storeId, categoryId, productData) => {
  try {
    const response = await fetch(`${API_URL}/stores/${storeId}/${categoryId}/product`, {
      method: 'POST',
      body: productData,
    });

    if (!response.ok) {
      throw new Error('Failed to post category');
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchAllProductCategoriesByStoreIdApi = async (storeId, categoryId) => {
  try {
    const response = await fetch(`${API_URL}/stores/${storeId}/${categoryId}/product`, {
      method: 'GET'
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Categories not found');
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

export const editProductToApi = async (productId, productData) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'PUT',
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return response;
    } catch (error) {
      throw error;
    }
};

export const deleteProductToApi = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/product/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return productId;
  } catch (error) {
    throw error;
  }
};



  