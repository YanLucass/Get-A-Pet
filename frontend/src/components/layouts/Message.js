import { useState, useEffect } from 'react';
import styles from './Message.module.css';
import bus from '../../utils/bus';


function Message() {
    //trabalhar com visibilidade da flash message
    const [visibility, setVisibility] = useState(false);
    //manipular a message da flash, ela começa vazia
    const [message, setMessage] = useState('');
    // o tipo da mensagem, se é de erro etc.
    const [type, setType] =useState('');

    // Para tomar uma ação qnd ocorrer o evento 
    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibility(true); // agora fica visivel
            setMessage(message);
            setType(type)

            //some depois de 3 segundos
            setTimeout(() => {
                setVisibility(false);
            }, 3000)
             
        })
    }, []);

    return( 
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
    )
}

export default Message;