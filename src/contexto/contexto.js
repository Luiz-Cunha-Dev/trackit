import { useState, createContext} from "react";


export const ContextoDeAutenticacao = createContext({});
const usuarioLocal = JSON.parse(localStorage.getItem("usuarioLocal"));

function ProvedorDeAutentificacao({children}){

    const [usuario, setUsuario] = useState(usuarioLocal);
    const [porcentagem, setPocentagem] = useState(0);
    const [habitosServidor, setHabitosServidor] = useState([]);

    return(
        <ContextoDeAutenticacao.Provider value={{usuario, setUsuario, porcentagem, setPocentagem, habitosServidor, setHabitosServidor}}>
            {children}
        </ContextoDeAutenticacao.Provider>
    )
}

export default ProvedorDeAutentificacao;