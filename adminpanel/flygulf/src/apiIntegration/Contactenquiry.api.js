// import.meta.env.VITE_API_BASE_URL

// const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contact`;

// function getToken() {
//   return localStorage.getItem("token") || "";
// }

// // GET all enquiries (admin only - requires JWT)
// export async function getEnquiries() {
//   try {
//     const res = await fetch(`${BASE_URL}/enquiries`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       return { success: false, message: err.message || "Failed to fetch enquiries" };
//     }

//     const data = await res.json();
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, message: "Network error. Please check your connection." };
//   }
// }

// // POST send a contact message (public)
// export async function sendContactMessage({ name, email, subject, message }) {
//   try {
//     const res = await fetch(`${BASE_URL}/send`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, subject, message }),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       return { success: false, message: err.message || "Failed to send message" };
//     }

//     const data = await res.json();
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, message: "Network error. Please check your connection." };
//   }
// }




// const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contact`;

// function getToken() {
//   return localStorage.getItem("token") || "";
// }

// // // GET all enquiries
// // export async function getEnquiries() {
// //   try {
// //     const res = await fetch(`${BASE_URL}/enquiries`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${getToken()}`,
// //       },
// //     });

// //     if (!res.ok) {
// //       const err = await res.json();
// //       return {
// //         success: false,
// //         message: err.message || "Failed to fetch enquiries",
// //       };
// //     }

// //     const data = await res.json();
// //     return { success: true, data };
// //   } catch (error) {
// //     return {
// //       success: false,
// //       message: "Network error. Please check your connection.",
// //     };
// //   }
// // }


// // ✅ Get only new enquiries
// export async function getNewEnquiries() {
//   try {
//     const res = await fetch(`${BASE_URL}/enquiries/new`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     if (!res.ok) {
//       const err = await res.json();
//       return { success: false, message: err.message || "Failed" };
//     }
//     const data = await res.json();
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, message: "Network error." };
//   }
// }

// // ✅ Mark single enquiry as seen
// export async function markEnquiryAsSeen(id) {
//   try {
//     const res = await fetch(`${BASE_URL}/enquiries/${id}/seen`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     return { success: res.ok };
//   } catch (error) {
//     return { success: false };
//   }
// }



const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contact`;

function getToken() {
  return localStorage.getItem("token") || "";
}

/* =========================================
   ✅ GET ALL ENQUIRIES
========================================= */
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
      return {
        success: false,
        message: err.message || "Failed to fetch enquiries",
      };
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

/* =========================================
   ✅ GET ONLY NEW ENQUIRIES
========================================= */
export async function getNewEnquiries() {
  try {
    const res = await fetch(`${BASE_URL}/enquiries/new`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        success: false,
        message: err.message || "Failed to fetch new enquiries",
      };
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

/* =========================================
   ✅ MARK ENQUIRY AS SEEN
========================================= */
export async function markEnquiryAsSeen(id) {
  try {
    const res = await fetch(`${BASE_URL}/enquiries/${id}/seen`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      return { success: false, message: "Failed to mark as seen" };
    }

    return { success: true };

  } catch (error) {
    return { success: false, message: "Network error." };
  }
}