// // // src/api/api.js

// // const BASE_URL = import.meta.env.VITE_API_BASE_URL/Courses;

// // // 🔐 Get token from localStorage
// // function getToken() {
// //   return localStorage.getItem("token") || "";
// // }

// // // 🔥 Common request handler
// // async function request(endpoint, options = {}) {
// //   try {
// //     const response = await fetch(`${BASE_URL}${endpoint}`, {
// //       ...options,
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: getToken() ? `Bearer ${getToken()}` : "",
// //         ...options.headers,
// //       },
// //     });

// //     const contentType = response.headers.get("content-type");

// //     let data;
// //     if (contentType && contentType.includes("application/json")) {
// //       data = await response.json();
// //     } else {
// //       data = await response.text();
// //     }

// //     if (!response.ok) {
// //       return {
// //         success: false,
// //         status: response.status,
// //         message: data?.message || "Something went wrong",
// //       };
// //     }

// //     return {
// //       success: true,
// //       status: response.status,
// //       data,
// //     };
// //   } catch (error) {
// //     return {
// //       success: false,
// //       message: "Network error. Please check your connection.",
// //     };
// //   }
// // }

// // // 🚀 API Methods
// // const api = {
// //   get: (endpoint) =>
// //     request(endpoint, {
// //       method: "GET",
// //     }),

// //   post: (endpoint, body) =>
// //     request(endpoint, {
// //       method: "POST",
// //       body: JSON.stringify(body),
// //     }),

// //   put: (endpoint, body) =>
// //     request(endpoint, {
// //       method: "PUT",
// //       body: JSON.stringify(body),
// //     }),

// //   patch: (endpoint, body) =>
// //     request(endpoint, {
// //       method: "PATCH",
// //       body: JSON.stringify(body),
// //     }),

// //   delete: (endpoint) =>
// //     request(endpoint, {
// //       method: "DELETE",
// //     }),
// // };

// // export default api;



// // src/api/api.js

// const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/courses`;

// // 🔐 Get token from localStorage
// function getToken() {
//   return localStorage.getItem("token") || "";
// }

// // 🔥 Common request handler
// async function request(endpoint = "", options = {}) {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
//         ...options.headers,
//       },
//     });

//     const contentType = response.headers.get("content-type");

//     let data;
//     if (contentType && contentType.includes("application/json")) {
//       data = await response.json();
//     } else {
//       data = await response.text();
//     }

//     if (!response.ok) {
//       return {
//         success: false,
//         status: response.status,
//         message: data?.message || "Something went wrong",
//       };
//     }

//     return {
//       success: true,
//       status: response.status,
//       data,
//     };
//   } catch (error) {
//     console.error("API Error:", error);
//     return {
//       success: false,
//       message: "Network error. Please check backend server.",
//     };
//   }
// }

// // 🚀 API Methods
// const api = {
//   get: (endpoint = "") =>
//     request(endpoint, {
//       method: "GET",
//     }),

//   post: (endpoint = "", body) =>
//     request(endpoint, {
//       method: "POST",
//       body: JSON.stringify(body),
//     }),

//   put: (endpoint = "", body) =>
//     request(endpoint, {
//       method: "PUT",
//       body: JSON.stringify(body),
//     }),

//   patch: (endpoint = "", body) =>
//     request(endpoint, {
//       method: "PATCH",
//       body: JSON.stringify(body),
//     }),

//   delete: (endpoint = "") =>
//     request(endpoint, {
//       method: "DELETE",
//     }),
// };

// export default api;



// ═══════════════════════════════════════════════════════════════════
//  courseApi.js  —  FlyGulf Course API
//  Matched 1-to-1 with CourseController.java
//
//  IMPORTANT — how each endpoint sends data:
//  ┌─────────────────────────────────┬──────────────────────────────┐
//  │ @RequestParam (no file)         │ → URL query string  ?k=v     │
//  │ @RequestParam + @RequestPart    │ → multipart/form-data body   │
//  │ @PathVariable                   │ → part of the URL            │
//  └─────────────────────────────────┴──────────────────────────────┘
// ═══════════════════════════════════════════════════════════════════

export const BASE_HOST = "http://localhost:8081";
export const API_BASE = `${BASE_HOST}/flygulf/api/flygulf/courses`;
// ══════════════════════════════════════════════════════════════════════
//  CONTROLLER MAPPING REFERENCE  (CourseController.java)
//
//  Endpoint                              Method  Body type
//  ─────────────────────────────────     ──────  ─────────────────────
//  POST   /courses                       POST    multipart/form-data
//  GET    /courses                       GET     —
//  GET    /courses/active                GET     —
//  GET    /courses/{id}                  GET     —
//  GET    /courses/{id}/images/check     GET     —
//  GET    /courses/by-shortform/{sf}     GET     —
//  PUT    /courses/{id}                  PUT     multipart/form-data
//  PATCH  /courses/{id}/toggle-status    PATCH   ?updatedBy= (query)
//  DELETE /courses/{id}/soft             DELETE  ?updatedBy= (query)
//  DELETE /courses/{id}/hard             DELETE  —
//
//  POST   /courses/{id}/overview         POST    ?params (query string)
//  PUT    /courses/{id}/overview         PUT     ?params (query string)
//  DELETE /overview/{id}/soft            DELETE  ?actor=  (query)
//
//  GET    /courses/{id}/design-cards     GET     —
//  POST   /courses/{id}/design-cards     POST    multipart/form-data
//  PUT    /design-cards/{id}             PUT     multipart/form-data
//  DELETE /design-cards/{id}/soft        DELETE  ?actor=  (query)
//  DELETE /design-cards/{id}/hard        DELETE  —
//
//  GET    /courses/{id}/contents         GET     —
//  POST   /courses/{id}/contents         POST    ?params (query string)
//  PUT    /contents/{id}                 PUT     ?params (query string)
//  DELETE /contents/{id}/soft            DELETE  ?actor=  (query)
//
//  GET    /courses/{id}/benefits         GET     —
//  POST   /courses/{id}/benefits         POST    multipart/form-data
//  PUT    /benefits/{id}                 PUT     multipart/form-data
//  DELETE /benefits/{id}/soft            DELETE  ?actor=  (query)
//
//  GET    /courses/{id}/subcourses               GET     —
//  GET    /courses/{id}/subcourses/paginated      GET     ?page=&size=
//  POST   /courses/{id}/subcourses               POST    multipart/form-data
//  PUT    /subcourses/{id}                        PUT     multipart/form-data
//  DELETE /subcourses/{id}/soft                   DELETE  ?actor=  (query)
//
//  GET    /courses/{id}/image/{type}     GET     — (returns bytes)
//  GET    /design-cards/{id}/image       GET     — (returns bytes)
//  GET    /benefits/{id}/image           GET     — (returns bytes)
//  GET    /subcourses/{id}/image         GET     — (returns bytes)
// ══════════════════════════════════════════════════════════════════════

// ── Shared fetch wrapper ────────────────────────────────────────────
const req = async (url, opts = {}) => {
  try {
    const res = await fetch(url, {
      mode: "cors",
      headers: { Accept: "application/json", ...(opts.headers || {}) },
      ...opts,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 120)}`);
    }
    return await res.json();
  } catch (e) {
    console.error("[courseApi]", url, e.message);
    return { success: false, message: e.message, data: null };
  }
};

// ── Multipart FormData builder ──────────────────────────────────────
// Only appends non-null / non-empty values
const fd = (fields = {}, files = {}) => {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== "") form.append(k, v);
  });
  Object.entries(files).forEach(([k, v]) => { if (v) form.append(k, v); });
  return form;
};

// ── URL query-string builder ────────────────────────────────────────
const qs = (params = {}) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== "") p.append(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};


// ═══════════════════════════════════════════════════════
//  TABLE 1 — COURSE
// ═══════════════════════════════════════════════════════

/** GET /courses  → all courses (admin) */
export const getAllCourses = () => req(API_BASE);

/** GET /courses/active  → public listing */
export const getActiveCourses = () => req(`${API_BASE}/active`);

/** GET /courses/:id */
export const getCourseById = (id) => req(`${API_BASE}/${id}`);

/** GET /courses/by-shortform/:shortForm */
export const getCourseByShortForm = (sf) => req(`${API_BASE}/by-shortform/${sf}`);

/** GET /courses/:id/images/check  (debug) */
export const checkImages = (id) => req(`${API_BASE}/${id}/images/check`);

/**
 * POST /courses  (multipart/form-data)
 * @RequestParam:  courseName*, shortForm*, shortDesc, aboutTitle,
 *                 aboutTotalExperience, aboutDescription, features,
 *                 courseDetailTitle, courseHours, intensive, createdBy
 * @RequestPart:   bannerImage, cardImage, logo, aboutImage, courseDetailImage
 */
export const createCourse = (fields, images = {}) =>
  req(API_BASE, {
    method: "POST",
    body: fd({ createdBy: "admin", ...fields }, images),
  });

/**
 * PUT /courses/:id  (multipart/form-data)
 * Same params as createCourse, all optional except id.
 */
export const updateCourse = (id, fields, images = {}) =>
  req(`${API_BASE}/${id}`, {
    method: "PUT",
    body: fd({ updatedBy: "admin", ...fields }, images),
  });

/**
 * PATCH /courses/:id/toggle-status?updatedBy=admin
 * Controller uses @RequestParam(defaultValue="admin") String updatedBy
 * → must be a query param, NOT body
 */
export const toggleStatus = (id, updatedBy = "admin") =>
  req(`${API_BASE}/${id}/toggle-status${qs({ updatedBy })}`, { method: "PATCH" });

/**
 * DELETE /courses/:id/soft?updatedBy=admin
 * Controller uses @RequestParam(defaultValue="admin") String updatedBy
 * → query param
 */
export const softDeleteCourse = (id, updatedBy = "admin") =>
  req(`${API_BASE}/${id}/soft${qs({ updatedBy })}`, { method: "DELETE" });

/** DELETE /courses/:id/hard  (no params) */
export const hardDeleteCourse = (id) =>
  req(`${API_BASE}/${id}/hard`, { method: "DELETE" });


// ═══════════════════════════════════════════════════════
//  TABLE 2 — OVERVIEW
//  All params are @RequestParam (no files) → query string
// ═══════════════════════════════════════════════════════

/**
 * POST /courses/:courseId/overview?title=&subTitle=&...
 */
export const saveOverview = (courseId, fields) =>
  req(`${API_BASE}/${courseId}/overview${qs({ actor: "admin", ...fields })}`, {
    method: "POST",
  });

/**
 * PUT /courses/:courseId/overview?title=&...
 */
export const updateOverview = (courseId, fields) =>
  req(`${API_BASE}/${courseId}/overview${qs({ actor: "admin", ...fields })}`, {
    method: "PUT",
  });

/**
 * DELETE /overview/:overviewId/soft?actor=admin
 */
export const softDeleteOverview = (overviewId, actor = "admin") =>
  req(`${API_BASE}/overview/${overviewId}/soft${qs({ actor })}`, { method: "DELETE" });


// ═══════════════════════════════════════════════════════
//  TABLE 3 — DESIGN CARDS
// ═══════════════════════════════════════════════════════

/** GET /courses/:courseId/design-cards */
export const getDesignCards = (courseId) => req(`${API_BASE}/${courseId}/design-cards`);

/**
 * POST /courses/:courseId/design-cards  (multipart/form-data)
 * @RequestParam:  colorBackground, title*, description, sortOrder, actor
 * @RequestPart:   logo
 */
export const addDesignCard = (courseId, fields, logo = null) =>
  req(`${API_BASE}/${courseId}/design-cards`, {
    method: "POST",
    body: fd({ actor: "admin", ...fields }, logo ? { logo } : {}),
  });

/**
 * PUT /design-cards/:cardId  (multipart/form-data)
 */
export const updateDesignCard = (cardId, fields, logo = null) =>
  req(`${API_BASE}/design-cards/${cardId}`, {
    method: "PUT",
    body: fd({ actor: "admin", ...fields }, logo ? { logo } : {}),
  });

/**
 * DELETE /design-cards/:cardId/soft?actor=admin
 */
export const softDeleteDesignCard = (cardId, actor = "admin") =>
  req(`${API_BASE}/design-cards/${cardId}/soft${qs({ actor })}`, { method: "DELETE" });

/** DELETE /design-cards/:cardId/hard */
export const hardDeleteDesignCard = (cardId) =>
  req(`${API_BASE}/design-cards/${cardId}/hard`, { method: "DELETE" });

/** Image URL helper — use as <img src={...}> */
export const designCardImageUrl = (cardId) => `${API_BASE}/design-cards/${cardId}/image`;


// ═══════════════════════════════════════════════════════
//  TABLE 4 — COURSE CONTENTS
//  All @RequestParam → query string (no files)
// ═══════════════════════════════════════════════════════

/** GET /courses/:courseId/contents */
export const getContents = (courseId) => req(`${API_BASE}/${courseId}/contents`);

/**
 * POST /courses/:courseId/contents?title=&sortOrder=&actor=
 */
export const addContent = (courseId, fields) =>
  req(`${API_BASE}/${courseId}/contents${qs({ actor: "admin", ...fields })}`, {
    method: "POST",
  });

/**
 * PUT /contents/:contentId?title=&sortOrder=&actor=
 */
export const updateContent = (contentId, fields) =>
  req(`${API_BASE}/contents/${contentId}${qs({ actor: "admin", ...fields })}`, {
    method: "PUT",
  });

/**
 * DELETE /contents/:contentId/soft?actor=admin
 */
export const softDeleteContent = (contentId, actor = "admin") =>
  req(`${API_BASE}/contents/${contentId}/soft${qs({ actor })}`, { method: "DELETE" });


// ═══════════════════════════════════════════════════════
//  TABLE 5 — BENEFITS
// ═══════════════════════════════════════════════════════

/** GET /courses/:courseId/benefits */
export const getBenefits = (courseId) => req(`${API_BASE}/${courseId}/benefits`);

/**
 * POST /courses/:courseId/benefits  (multipart/form-data)
 * @RequestParam:  title*, description, sortOrder, actor
 * @RequestPart:   logo
 */
export const addBenefit = (courseId, fields, logo = null) =>
  req(`${API_BASE}/${courseId}/benefits`, {
    method: "POST",
    body: fd({ actor: "admin", ...fields }, logo ? { logo } : {}),
  });

/**
 * PUT /benefits/:benefitId  (multipart/form-data)
 */
export const updateBenefit = (benefitId, fields, logo = null) =>
  req(`${API_BASE}/benefits/${benefitId}`, {
    method: "PUT",
    body: fd({ actor: "admin", ...fields }, logo ? { logo } : {}),
  });

/**
 * DELETE /benefits/:benefitId/soft?actor=admin
 */
export const softDeleteBenefit = (benefitId, actor = "admin") =>
  req(`${API_BASE}/benefits/${benefitId}/soft${qs({ actor })}`, { method: "DELETE" });

/** Image URL helper */
export const benefitImageUrl = (benefitId) => `${API_BASE}/benefits/${benefitId}/image`;


// ═══════════════════════════════════════════════════════
//  SUB COURSES
// ═══════════════════════════════════════════════════════

/** GET /courses/:courseId/subcourses */
export const getSubCourses = (courseId) => req(`${API_BASE}/${courseId}/subcourses`);

/** GET /courses/:courseId/subcourses/paginated?page=0&size=10 */
export const getSubCoursesPaginated = (courseId, page = 0, size = 10) =>
  req(`${API_BASE}/${courseId}/subcourses/paginated${qs({ page, size })}`);

/**
 * POST /courses/:courseId/subcourses  (multipart/form-data)
 * @RequestParam:  title*, description, sortOrder, actor
 * @RequestPart:   cardImage
 */
export const addSubCourse = (courseId, fields, cardImage = null) =>
  req(`${API_BASE}/${courseId}/subcourses`, {
    method: "POST",
    body: fd({ actor: "admin", ...fields }, cardImage ? { cardImage } : {}),
  });

/**
 * PUT /subcourses/:subCourseId  (multipart/form-data)
 */
export const updateSubCourse = (subCourseId, fields, cardImage = null) =>
  req(`${API_BASE}/subcourses/${subCourseId}`, {
    method: "PUT",
    body: fd({ actor: "admin", ...fields }, cardImage ? { cardImage } : {}),
  });

/**
 * DELETE /subcourses/:subCourseId/soft?actor=admin
 */
export const softDeleteSubCourse = (subCourseId, actor = "admin") =>
  req(`${API_BASE}/subcourses/${subCourseId}/soft${qs({ actor })}`, { method: "DELETE" });

/** Image URL helper */
export const subCourseImageUrl = (subCourseId) => `${API_BASE}/subcourses/${subCourseId}/image`;


// ═══════════════════════════════════════════════════════
//  COURSE IMAGE URL HELPERS  (use as <img src={...}>)
//  GET /courses/:id/image/:type
//  type = "banner" | "card" | "logo" | "about" | "detail"
// ═══════════════════════════════════════════════════════
export const courseImageUrl = (id, type) => `${API_BASE}/${id}/image/${type}`;


// ── Default export (convenience) ────────────────────────────────────
const courseApi = {
  getAllCourses, getActiveCourses, getCourseById, getCourseByShortForm,
  checkImages, createCourse, updateCourse, toggleStatus,
  softDeleteCourse, hardDeleteCourse,
  saveOverview, updateOverview, softDeleteOverview,
  getDesignCards, addDesignCard, updateDesignCard, softDeleteDesignCard, hardDeleteDesignCard, designCardImageUrl,
  getContents, addContent, updateContent, softDeleteContent,
  getBenefits, addBenefit, updateBenefit, softDeleteBenefit, benefitImageUrl,
  getSubCourses, getSubCoursesPaginated, addSubCourse, updateSubCourse, softDeleteSubCourse, subCourseImageUrl,
  courseImageUrl,
};
export default courseApi;