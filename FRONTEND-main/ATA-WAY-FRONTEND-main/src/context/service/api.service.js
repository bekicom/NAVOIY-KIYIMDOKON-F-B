import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function resolveBaseUrl() {
  const configuredUrl = String(import.meta.env.VITE_API_BASE_URL || "").trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://127.0.0.1:4100/api";
  }

  return "";
}

const baseQuery = fetchBaseQuery({
  baseUrl: resolveBaseUrl(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("sklad_token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    localStorage.removeItem("sklad_token");
    localStorage.removeItem("sklad_user");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Dashboard", "Category", "Supplier", "SupplierDetail", "Product", "Purchase", "Transfer", "Store"],
  endpoints: () => ({}),
});
