import Cookies from "js-cookie";



export const addSaleCode = async (formData) => {
    try {
        const response = await fetch('/api/admin/add-sale-code',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify(formData)
            }
        )
        const data = await response.json()
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getAllSaleCodes = async () => {
    try {

        const res = await fetch(`http://localhost:3000/api/admin/all-sale-codes`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            },


        )
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);

    }
};

export const deleteSaleCode = async (id) => {
    try {

        const res = await fetch(`/api/admin/delete-sale-code?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            },
        )
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const applySaleCode = async (id) => {
    try {
       
        const res = await fetch(`http://localhost:3000/api/client/get-code-by-id?id=${id}`,
            {
                method: 'GET',
                cache: "no-store",
            },


        )
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}