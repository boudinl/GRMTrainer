import jwt from 'jsonwebtoken'



export const dynamic = "force-dynamic";


const AuthUser = async(req) => {

    const token = req.headers.get('Authorization')?.split(" ")[1]
    console.log(token);
    if (!token) return false

    try {
        const extractAuthUserInfo = jwt.verify(token, process.env.JWT_SECRET);
  
        if (extractAuthUserInfo){
            return extractAuthUserInfo
        }
        
    } catch (error) {
        console.log(error);
        return false
        
    }
    
}

export default AuthUser;