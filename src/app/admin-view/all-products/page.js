
import CommonListing from "@/components/CommonListing"
import { getAllAdminProducts } from "@/services/product"


export default async function AdminAllProducts(){
    
    const allAdminProducts = await getAllAdminProducts('http://localhost:3000')
   
    return (
          <CommonListing data={allAdminProducts && allAdminProducts.data}></CommonListing>
    )
      
}