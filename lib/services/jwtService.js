import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const jwtSecret=process.env.JWT_SECRET;
const expiry= '7d';

export function generateToken(payload){
    return jwt.sign(payload, jwtSecret, { expiresIn: expiry})
}



export async function comparePassword({enteredPassword, realPassword}){
    return await bcrypt.compare(enteredPassword, realPassword );
}


export function safeUser(user){
   const { password, ...newUser } = user;

   return newUser;

}