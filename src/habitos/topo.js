import logo2 from "../img/TrackIt.png"
import styled from "styled-components"
import { useContext, useEffect } from "react";
import { ContextoDeAutenticacao } from "../contexto/contexto"

export default function Topo(){
    const {usuario} = useContext(ContextoDeAutenticacao)
    console.log(usuario)

    return(
        <EstiloTopo>
        <img src={logo2} alt="logo" />
        <img src={usuario.data.image} alt="logo" />
        </EstiloTopo>
    )
}

const EstiloTopo= styled.div`
z-index: 2;
width: 375px;
height: 70px;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
left: 0;
top: 0;
width: 100%;
img:nth-child(1){
margin-left: 18px;
}
img:nth-child(2){
width: 51px;
height: 51px;
border-radius: 98.5px;
margin-right: 18px;
}
`