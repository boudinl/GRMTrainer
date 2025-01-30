//add a new product service

import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const url = isDevelopment
    ? "http://localhost:3000/api/admin/all-products"
    : process.env.NEXT_PUBLIC_API_URL + "/api/admin/all-products";
  try {
    //ATENTION ICI CHANGER l'URL COMPLETE QD HEBERGEUR
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (id) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const url = isDevelopment
    ? `http://localhost:3000/api/client/product-by-category?id=${id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/client/product-by-category?id=${id}`;
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const url = isDevelopment
    ? `http://localhost:3000/api/client/product-by-id?id=${id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/client/product-by-id?id=${id}`;
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByProductType = async (id) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const url = isDevelopment
    ? `http://localhost:3000/api/client/product-by-product-type?id=${id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/client/product-by-product-type?id=${id}`;
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
