import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../form/Input";
import styles from '../../form/Form.module.css'
import Login from './Login'
//contexts
import { Context } from "../../../context/UserContext";

function Register() {

    //estado inicial do usuario vazio
    const [user, setUser] = useState({});
    const { register } = useContext(Context);
     
    //vai executar as mudanças
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        //enviar usuario para o banco
       register(user);
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text="nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                />

                <Input 
                    text="telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu telefone"
                    handleOnChange={handleChange}
                /> 

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar"></input>
            </form>
            <p>Já tem conta? <Link to="/login"> Clique aqui</Link></p>
        </section>
    )
}

export default Register;