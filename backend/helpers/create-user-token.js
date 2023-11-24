import jwt from 'jsonwebtoken';

//create
const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, "nossosecret");

    //return response
    res.status(200).json({
        message: "Você está autenticado!", 
        token: token, 
        userId: user._id,
    });

}



export default createUserToken;