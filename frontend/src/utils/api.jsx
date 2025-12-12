// src/utils/api.jsx
const BASE_URL = "http://localhost:8000/api";
async function parseJSONResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    return json;
  }
  const text = await res.text();
  return { success: res.ok, message: text, data: null };
}

async function getJSON(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    return await parseJSONResponse(res);
  } catch (err) {
    console.error("GET error:", err);
    return {
      success: false,
      message: err.message || "Network error",
      data: null,
    };
  }
}
async function postJSON(url, body = {}) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return await parseJSONResponse(res);
  } catch (err) {
    console.error("POST error:", err);
    return {
      success: false,
      message: err.message || "Network error",
      data: null,
    };
  }
}
export async function getIjazah() {
  const url = `${BASE_URL}/list.php`;
  const res = await getJSON(url);

  if (Array.isArray(res)) return { success: true, message: "OK", data: res };
  if (res && (res.status !== undefined || res.data !== undefined)) {
    const success =
      res.status === true || res.success === true || res.status === "success";
    return { success, message: res.message || "", data: res.data || [] };
  }
  return { success: false, message: "Unknown response", data: [] };
}

export async function getDetailIjazah(id) {
  if (!id) return { success: false, message: "ID diperlukan", data: null };
  const url = `${BASE_URL}/detail.php?id=${encodeURIComponent(id)}`;
  const res = await getJSON(url);
  if (res && res.data !== undefined)
    return {
      success: res.status === true || res.success === true,
      message: res.message || "",
      data: res.data,
    };
  return {
    success: false,
    message: res.message || "Gagal ambil detail",
    data: null,
  };
}

export async function uploadIjazah(formData) {
  try {
    const res = await fetch(`${BASE_URL}/upload.php`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const parsed = await parseJSONResponse(res);
    if (parsed && parsed.status !== undefined) {
      return {
        success: parsed.status === true || parsed.status === "success",
        message: parsed.message || "",
        data: parsed.data || null,
      };
    }
    return {
      success: res.ok,
      message: parsed.message || "Upload selesai",
      data: parsed.data || null,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      success: false,
      message: err.message || "Upload gagal",
      data: null,
    };
  }
}
export async function deleteIjazah(id) {
  if (!id) return { success: false, message: "ID diperlukan" };
  const res = await postJSON(`${BASE_URL}/delete.php`, { id });
  if (res && (res.status !== undefined || res.success !== undefined)) {
    const success =
      res.status === true || res.success === true || res.status === "success";
    return { success, message: res.message || "", data: res.data || null };
  }
  return { success: false, message: res.message || "Gagal menghapus" };
}
export async function downloadIjazah(id) {
  if (!id) throw new Error("ID diperlukan");
  const url = `${BASE_URL}/download.php?id=${encodeURIComponent(id)}`;
  try {
    const res = await fetch(url, { method: "GET", credentials: "include" });
    if (!res.ok) {
      const parsed = await parseJSONResponse(res);
      throw new Error(parsed.message || `HTTP ${res.status}`);
    }
    const blob = await res.blob();
    return { success: true, blob };
  } catch (err) {
    console.error("Download error:", err);
    return { success: false, message: err.message || "Gagal download" };
  }
}
export async function login(username, password) {
  if (!username || !password)
    return { success: false, message: "Username & password diperlukan" };
  const res = await postJSON(`${BASE_URL}/login.php`, { username, password });
  if (
    res &&
    (res.status === true || res.success === true || res.status === "success")
  ) {
    if (res.data && res.data.token) {
      try {
        localStorage.setItem("token", res.data.token);
      } catch (e) {}
    }
    return {
      success: true,
      message: res.message || "Login berhasil",
      data: res.data || null,
    };
  }
  return { success: false, message: res.message || "Login gagal", data: null };
}
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}
export default {
  getIjazah,
  getDetailIjazah,
  uploadIjazah,
  deleteIjazah,
  downloadIjazah,
  login,
  getAuthHeaders,
};
