const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/centers`;

function getToken() {
  return localStorage.getItem("token") || "";
}

// ✅ GET all centers — public
export async function getCenters() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return { success: false, message: "Failed to fetch centers" };
    const data = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, message: "Network error" };
  }
}

// ✅ POST — create new center
export async function createCenter(center) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(center),
    });
    if (!res.ok) return { success: false, message: "Failed to create" };
    const data = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, message: "Network error" };
  }
}

// ✅ PUT — update existing center
export async function updateCenter(id, center) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(center),
    });
    if (!res.ok) return { success: false, message: "Failed to update" };
    const data = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, message: "Network error" };
  }
}

// ✅ DELETE — remove center
export async function deleteCenter(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) return { success: false, message: "Failed to delete" };
    return { success: true };
  } catch {
    return { success: false, message: "Network error" };
  }
}