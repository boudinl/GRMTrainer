import CommonDetails from "@/components/CommonDetails"
import { productById } from "@/services/product"




export default async function ProductDetails({ params }) {

    const { details } = await params

  console.log(details)
    const productDetailsData = await productById(details)
    console.log(productDetailsData)




    return <CommonDetails item={productDetailsData && productDetailsData.data}/>
}