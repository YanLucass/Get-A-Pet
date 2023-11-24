import jwt from 'jsonwebtoken'
import getToken from './get-token';

//middleware to validate token to proteced routes.
const checkToken = (req, res, next) => {   

    //if nothing authorization header
    if(!req.headers.authorization) {
        return res.status(401).json({message: 'Acesso negado!'});
    } 

    const token = getToken(req);
  
    //if not token, block the user
    if(!token) {
        return res.status(401).json({message: 'Acesso negado!'});
    }
    // all right try:
    try {
        const decodedUser = jwt.verify(token, 'nossosecret');
        req.user = decodedUser;
        next();
    } catch(err) {
        return res.status(400).json({message: 'token inválido!'});
    }
    

}   

export default checkToken;