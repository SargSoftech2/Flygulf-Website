const BASE_URL = "http://localhost:8081/api/contact";

function getToken() {
  return localStorage.getItem("token") || "";
}

// GET all enquiries (admin only - requires JWT)
export async function getEnquiries() {
  try {
    const res = await fetch(`${BASE_URL}/enquiries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, message: err.message || "Failed to fetch enquiries" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Network error. Please check your connection." };
  }
}

// POST send a contact message (public)
export async function sendContactMessage({ name, email, subject, message }) {
  try {
    const res = await fetch(`${BASE_URL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, message: err.message || "Failed to send message" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Network error. Please check your connection." };
  }
}