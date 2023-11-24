const getToken = (req) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    console.log(token); 
    return token;
}

export default getToken;    