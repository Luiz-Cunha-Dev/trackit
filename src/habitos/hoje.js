import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ContextoDeAutenticacao } from "../contexto/contexto"
import dayjs from 'dayjs'
import certo from "../img/certo.png"




export default function Hoje() {

    const { usuario, porcentagem, setPocentagem, habitosServidor, setHabitosServidor } = useContext(ContextoDeAutenticacao);
    const datas = dayjs();
    const [diaSemana, setDiaSemana] = useState();
    const [diaMes, setDiaMes] = useState();
    const [mes, setMes] = useState();
    const token = usuario.data.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    

    function diaDaSemana(){
        if(datas.day() === 0){
            return "Domingo"
        }else if(datas.day() === 1){
            return "Segunda"
        }else if(datas.day() === 2){
            return "Terça"
        }else if(datas.day() === 3){
            return "Quarta"
        }else if(datas.day() === 4){
            return "Quinta"
        }else if(datas.day() === 5){
            return "Sexta"
        }else if(datas.day() === 6){
            return "Sabado"
        }
    }

    useEffect(() => { 
        let valor = diaDaSemana
        setDiaSemana(valor)
        setDiaMes(datas.date());
        setMes(datas.month() + 1);


        
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(url, config)
            .then(res => {
                setHabitosServidor(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let numeroDeHabitosDoDia = habitosServidor.length;
        let numeroDeHabitosConcluidos = 0;


        for(let i = 0; i < numeroDeHabitosDoDia; i++){
            if(habitosServidor[i].done === true){
                numeroDeHabitosConcluidos++
            }
        }

        let porcentagemConcluida = (numeroDeHabitosConcluidos/numeroDeHabitosDoDia)*100;
        porcentagemConcluida = Math.round(porcentagemConcluida)


        if(isNaN(porcentagemConcluida)){
            setPocentagem(0);
        }else{
            setPocentagem(porcentagemConcluida);
        }

    }, [habitosServidor]);

    function atualizarHabitos(){

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(url, config)
            .then(res => {
                setHabitosServidor(res.data);
            })
            .catch(err => {console.log(err)
            })
    }

    function definirEstadoDoHabito(id, estado){

        if(estado !== true){
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            axios.post(url, null, config)
                .then(res => {
                    atualizarHabitos()
                })
                .catch(err => console.log(err))

        }else{
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            axios.post(URL, null, config)
                .then(res => {
                    atualizarHabitos()
                })
                .catch(err => console.log(err))
        }
    }

    function HabitosDoDia(props){
        return(
            <Habito data-identifier="today-infos" cor={props.cor} corSequenciaAtual={props.corSequenciaAtual} corRecorde={props.corRecorde}>
                <h1>{props.name}</h1>
                <p>Sequência atual: <span>{props.currentSequence} dias</span></p>
                <p>Seu recorde: <b>{props.highestSequence} dias</b></p>
                <button data-identifier="done-habit-btn" onClick={() => definirEstadoDoHabito(props.id, props.estado)}  ><img src={certo} alt="certo" /></button>
            </Habito>
        )
    }


    return (
        <>
            <Topo />
            <Fundo>
                <TelaHoje>
                    <Titulo cor={porcentagem !== 0 ? "#8FC549" : "#BABABA"}>
                    <h1 data-identifier="today-infos">{diaSemana}, {diaMes}/{mes}</h1>
                        <span data-identifier="today-infos">{porcentagem !== 0 ? `${porcentagem}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"}</span>
                    </Titulo>
                    {habitosServidor.map(h => <HabitosDoDia key={h.id} id={h.id} estado={h.done} corRecorde={h.currentSequence === h.highestSequence && h.done !== false ? "#8FC549" : ""} corSequenciaAtual={h.done !== false ? "#8FC549" : "#666666"} cor={h.done !== false ? "#8FC549" : "#EBEBEB"} name={h.name} currentSequence={h.currentSequence} highestSequence={h.highestSequence}/>)}
                </TelaHoje>
            </Fundo>
            <Menu porcentagem={porcentagem} />
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
p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 12.976px;
line-height: 16px;
color: #666666;
}
span{
    color: ${props => props.corSequenciaAtual};
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
b{
    display: inline;
    color: ${props => props.corRecorde};
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
color: ${props => props.cor}
}
`

const Fundo = styled.div`
width: 100%;
height: 100%;
margin-bottom: 70px;
background: #E5E5E5;
overflow: scroll;
`