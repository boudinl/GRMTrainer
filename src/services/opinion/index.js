import Cookies from "js-cookie";

export const addOpinion = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-opinion", {
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

export const getAllOpinions = async () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const url = isDevelopment
    ? "http://localhost:3000/api/admin/all-opinions"
    : process.env.NEXT_PUBLIC_API_URL + "/api/admin/all-opinions";
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
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

export const deleteOpinion = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-opinion?id=${id}`, {
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
