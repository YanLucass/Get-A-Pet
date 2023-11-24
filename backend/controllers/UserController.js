//import models
import User from '../models/User.js';
//import bcrypt
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
//import helpers
import createUserToken from '../helpers/create-user-token.js';
import getToken from '../helpers/get-token.js';
import getUserByToken from '../helpers/get-user-by-token.js';

import mongoose from '../db/conn.js';
import { ObjectId } from 'mongodb';

class UserController {

    static async register(req, res) {
        const { name, email, phone, password, confirmPassword} = req.body;

        //validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório!'});
            return;
        }

        if(!email) {
            res.status(422).json({message: 'O email é obrigatório!'});
            return;
        }

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatório!'});
            return;
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória!'});
            return;
        }

        if(!confirmPassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória!'});
            return;
        }

        if(password !== confirmPassword) {
            res.status(422).json({message: 'A senha e a confirmação de senha devem ser iguais!'});
            return;
        }

        //check if usersExists(checar se o usuario já existe)

        const usersExists = await User.findOne({email: email});

        if(usersExists) {
            res.status(422).json({ message: 'Email já está cadastrado no sistema'});
            return;     
        }

        //create password with bcrypts
        const salt = await bcrypt.genSalt(12); // 12 iterator 
        const passwordHash = await bcrypt.hash(password, salt);

        //create a user;
        const user = new User({
            name: name,
            email,
            phone: phone,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res);

        } catch(err) {
            res.status(500).json({message: err})
        }


        return;
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if(!email) {
            res.status(422).json({message: "O email é obrigatório!"});
            return;
        }

        if(!password) {
            res.status(422).json({message: "A senha é obrigatória!"});
            return;
        }
        
        //check if user exists (checar se o usuario existe);
        const user = await User.findOne({ email: email });

        if(!user) {
            res.status(422).json({message: "Esse usuário não existe!"});
            return;
        }

        //check if password match with db password(checar se as senhas batem com a do banco)
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            res.status(422).json({ message: "Senha incorreta!"});
            return;
        }

        // now we will create a token for the user 
        await createUserToken(user, req, res);

        return;
    }

    // Get a current user with a token. Function 'helper' ( Maneira para saber se o usuario está logado ou nao)
    static async checkUser(req, res) {
        let currentUser;
        //console.log(req.headers.authorization);
        if(req.headers.authorization) {

            const token = getToken(req);
            //decod token to find the user.
            const decoded = jwt.verify(token, 'nossosecret');
            console.log(decoded);
            // get current USER
            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;

        } else {
            currentUser = null
        }

        //return user we can use on the front let's use in profile editing. 
        res.status(200).send(currentUser);
    }

    //PEGAR UM USUARIO POR ID
    static async getUserById(req, res) {
        const id = req.params.id;

        const user = await User.findById({_id: id}).select('-password');

        if(!user) {
            res.status(422).json({ message: "Usuario não encontrado!"});
            return;
        }

        res.status(200).json({ user });
    }

    //edit user
    static async editUser(req, res) {

        const { name, email, phone, password, confirmPassword } = req.body;
        let image = '';

       
        //pegar usuario pelo token, evitar que pegue por um id de outra pessoa. 
        const token = getToken(req);
        const user = await getUserByToken(token);

        if(req.file) {
            user.image = req.file.filename;
        }

        //validations
        if(!name) {
            res.status(401).json({message: "nome é obrigatório"});
            return;
        }

        user.name = name;
        if(!email) {
            res.status(401).json({message: "O email é obrigatório!"});
            return;
        }

        //verificar se o email enviado pertence a outro usuario. 
        const userExists = await User.findOne({email: email});

        if(user.email != email && userExists) {
            res.status(422).json({message: 'Por favor utilize outro email!'});
            return;
        }

        user.email = email;

        
        if(!phone) {
            res.status(401).json({message: "O telefone é obrigatorio!"});
            return;
        }

        user.phone = phone;

        if(password != confirmPassword) {
            res.status(422).json({message: 'As senhas devem ser iguais'});
            return; 
            
        } else if(password != null) {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        try {
                await User.findByIdAndUpdate(  //esse dado vai ficar salvo. Podemos pegar do front.
                {_id: user._id},
                {$set: user },
                {new: true},
            );
            
            res.status(200).json({message: "Usuario atualizado com sucesso!", user})
            return;
        } catch (error) {
            console.log(error);
        }

        
    }
}

export default UserController;  