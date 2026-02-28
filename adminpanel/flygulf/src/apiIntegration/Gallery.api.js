const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Gallery Items API
export const getAllItems = async () => {
  const response = await fetch(`${API_BASE_URL}/gallery/items`);
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(`${API_BASE_URL}/gallery/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
};

export const updateItem = async (id, item) => {
  const response = await fetch(`${API_BASE_URL}/gallery/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
};

export const deleteItem = async (id) => {
  await fetch(`${API_BASE_URL}/gallery/items/${id}`, {
    method: 'DELETE'
  });
};

// Page Content API
export const getPageContent = async () => {
  const response = await fetch(`${API_BASE_URL}/gallery/content`);
  return response.json();
};

export const updatePageContent = async (content) => {
  const response = await fetch(`${API_BASE_URL}/gallery/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  });
  return response.json();
};
