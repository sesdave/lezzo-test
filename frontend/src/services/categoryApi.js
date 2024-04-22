const API_URL = 'http://localhost:5000'; // Replace this with your actual API URL

export const postCategoryToApi = async (storeId, categoryData) => {
    console.log(`Entered Ready to post ${categoryData.get('name')}`)
  try {
    const response = await fetch(`${API_URL}/category/${storeId}`, {
      method: 'POST',
      body: categoryData,
    });

    if (!response.ok) {
      throw new Error('Failed to post category');
    }
    console.log("response", response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchAllCategoriesByStoreIdApi = async (storeId) => {
  try {
    const response = await fetch(`${API_URL}/stores/${storeId}/category`, {
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

export const updateCategoryInApi = async (storeId, categoryId, categoryData) => {
  console.log("sending data for update", categoryData.get('name'))
  try {
    const response = await fetch(`${API_URL}/category/${storeId}/${categoryId}`, {
      method: 'PUT',
      body: categoryData,
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryToApi = async (storeId, categoryId) => {
  console.log("entered delete")
try {
  const response = await fetch(`${API_URL}/category/${storeId}/${categoryId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }

  return response;
} catch (error) {
  throw error;
}
};


  