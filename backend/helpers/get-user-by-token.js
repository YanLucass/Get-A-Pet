import jwt from 'jsonwebtoken';
import User from '../models/User';

const getUserByToken = async (token) => {

    if(!token) {
        return res.status(401).json({message: 'Acesso negado!'});
    }

    const decoded = jwt.verify(token, 'nossosecret');
    const userId = decoded.id;

    //agora buscamos o usuario especifico que tem o id que veio do token
    const user = await User.findOne({_id: userId});
    return user;
}


export default getUserByToken;