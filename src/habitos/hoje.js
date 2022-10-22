import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ContextoDeAutenticacao } from "../contexto/contexto"
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import certo from "../img/certo.png"
import 'dayjs/locale/pt-br'
dayjs.extend(isLeapYear) 
dayjs.locale('pt-br')




export default function Hoje() {

    const { usuario } = useContext(ContextoDeAutenticacao);
    const token = usuario.data.token;
    const [habitosServidor, setHabitosServidor] = useState([]);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const [porcentagem, setPocentagem] = useState(0)
    

    useEffect(() => {
        console.log(dayjs())
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(url, config)
            .then(res => {
                console.log(res);
                setHabitosServidor(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    function atualizarHabitos(){

        console.log(dayjs())
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(url, config)
            .then(res => {
                console.log(res);
                setHabitosServidor(res.data);
                console.log(habitosServidor);
                atualizarPorcentagem()
            })
            .catch(err => {console.log(err)
                atualizarPorcentagem()
            })
            atualizarPorcentagem()
    }

    function atualizarPorcentagem(){

        let numeroDeHabitosDoDia = habitosServidor.length;
        let numeroDeHabitosConcluidos = 0;

        for(let i = 0; i < numeroDeHabitosDoDia; i++){
            if(habitosServidor[i].done === true){
                numeroDeHabitosConcluidos++
            }
        }


        console.log(numeroDeHabitosDoDia);
        console.log(numeroDeHabitosConcluidos);

        let porcentagemConcluida = (numeroDeHabitosConcluidos/numeroDeHabitosDoDia)*100;
        setPocentagem(porcentagemConcluida);
    }

    function HabitosDoDia(props){
        return(
            <Habito cor={props.cor}>
                <h1>{props.name}</h1>
                <span>Sequência atual: {props.currentSequence}</span>
                <span>Seu recorde: {props.highestSequence}</span>
                <button onClick={() => definirEstadoDoHabito(props.id, props.estado)}  ><img src={certo} alt="certo" /></button>
            </Habito>
        )
    }

    function definirEstadoDoHabito(id, estado){

        if(estado !== true){
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            axios.post(url, null, config)
                .then(res => {console.log(res)
                    atualizarHabitos()
                })
                .catch(err => console.log(err))

        }else{
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            axios.post(URL, null, config)
                .then(res => {
                    console.log(res);
                    atualizarHabitos()
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <>
            <Topo />
            <Fundo>
                <TelaHoje>
                    <Titulo>
                    <h1>Segunda, 17/05</h1>
                        <span>{habitosServidor !== [] ? `${porcentagem}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"}</span>
                    </Titulo>
                    {habitosServidor.map(h => <HabitosDoDia key={h.id} id={h.id} estado={h.done} cor={h.done !== false ? "#8FC549;" : "#EBEBEB"} name={h.name} currentSequence={h.currentSequence} highestSequence={h.highestSequence}/>)}
                </TelaHoje>
            </Fundo>
            <Menu />
        </>
    )
}

const Habito = styled.div`
width: 340px;
height: 94px;
background: #FFFFFF;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
padding-left: 15px;
margin-bottom: 10px;
h1{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #666666;
margin-top: 13px;
margin-bottom: 7px;
}
span{
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;
}
button{
width: 69px;
height: 69px;
background: ${props => props.cor};
border: 1px solid #E7E7E7;
border-radius: 5px;
position: absolute;
top: 13px;
right: 13px;
}
`

const TelaHoje = styled.div`
width: 100%;
margin-top: 98px;
padding-left: 17px;
padding-right: 18px;
`

const Titulo = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 28px;
h1{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
}
span{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #BABABA;
}
`

const Fundo = styled.div`
width: 100%;
height: 100%;
margin-bottom: 70px;
background: #E5E5E5;
overflow: scroll;
`