import {sign} from "jsonwebtoken"

const generateToken = ({id,email}:{id:string,email:string})=>{
    return sign({id,email},process.env.SECRET_KEY!);
}

export {generateToken};