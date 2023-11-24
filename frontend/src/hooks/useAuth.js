import api from "../utils/api";

import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false); //usuario começa não autenticado
    //pegar função setFlashMessage responsavel por disparar o evento.
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    //inserir token na api
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true);
        }
    }, []);

    async function register(user) {

        //para a flash message
        let msgText  = 'Cadastro realizado com sucesso';
        let msgType = 'sucess';

        try {
            //aq
            const data = await api.post('/users/register', user).then(response => {
                return response.data;
            })
            console.log(data);
            //logar o usuario
            await authUser(data);

        } catch (error) {
            msgText = error.response.data.message; //campos diferentes etc, nom en preenchido
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType);
        // vamos executar uma função(Vamos poder executar ela no login também);
        //recebe os dados do registro(os do response.data)  
     }


     async function login(user) {
        let msgText = 'Login realizado com sucesso';
        let msgType = 'sucess'

        try {
            //consumindo
             const data = await api.post('/users/login', user).then(response => {
                console.log(response);
                console.log(response.data);
                return response.data;
             })

             await authUser(data);
        } catch(error) {
            msgText = error.response.data.message; //message é oq definimos no back
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType);
     }
     
     function logout() {
        const msgText = 'Logout realizado com sucesso';
        const msgType = 'sucess'
        
        //deslogar
        setAuthenticated(false);
        localStorage.removeItem('token');
        //retirar o token do headers authorization
        api.defaults.headers.Authorization = undefined;
        navigate('/');

        setFlashMessage(msgText, msgType);

    }


    async function authUser(data) {
        setAuthenticated(true)
        //salvando como string no localStorage
        localStorage.setItem('token', JSON.stringify(data.token)); 
        navigate('/') //Redirecionando para home
    }

     return { authenticated, register, logout, login}
}