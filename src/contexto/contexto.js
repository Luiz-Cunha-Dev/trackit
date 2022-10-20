import { useState, createContext} from "react";


export const ContextoDeAutenticacao = createContext({})

function ProvedorDeAutentificacao({children}){

    const [usuario, setUsuario] = useState();

    return(
        <ContextoDeAutenticacao.Provider value={{usuario, setUsuario}}>
            {children}
        </ContextoDeAutenticacao.Provider>
    )
}

export default ProvedorDeAutentificacao;