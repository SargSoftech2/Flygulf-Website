
// const API_BASE_URL = "http://localhost:8081/api";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      return { success: true, data };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

// Update Password API
export const updatePassword = async (currentPassword, newPassword, confirmPassword) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || "Password update failed" };
    }
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

// Logout API
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    }

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    return { success: true };
  } catch (error) {
    // Even if API fails, clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    return { success: true };
  }
};

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Get current user info
export const getCurrentUser = () => {
  return {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
  };
};