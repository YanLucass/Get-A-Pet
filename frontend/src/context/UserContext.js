import { createContext } from "react";
import useAuth from '../hooks/useAuth';

const Context = createContext()

//criar provedor de contexto, essa função dá o contexto as entidades/componentes

function UserProvider({children}) {
     const { authenticated, register, logout, login } = useAuth();

     return (
        <Context.Provider value={{ authenticated, register, logout, login}} >
            {children}
        </Context.Provider>
     )
}


export {Context, UserProvider}