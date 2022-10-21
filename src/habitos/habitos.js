import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ContextoDeAutenticacao } from "../contexto/contexto"
import lixeira from "../img/Vector.png"

const coresBotao = ["#FFFFFF", "#DBDBDB", "#CFCFCF"]

export default function Habitos() {

    const { usuario } = useContext(ContextoDeAutenticacao)
    console.log(usuario)
    const [adicionar, setAdicionar] = useState(false);
    const [dias, setDias] = useState([]);
    const [nomeHabito, setNomeHabito] = useState("")
    const [habitosServidor, setHabitosServidor] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.data.token}`
            }
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        axios.get(url, config)
            .then(res => {
                console.log(res);
                setHabitosServidor(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    function criarHabito() {
        if (nomeHabito !== "" && dias.length !== 0) {
            let novoHabito =
            {
                name: nomeHabito,
                days: dias
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.data.token}`
                }
            }

            console.log(nomeHabito);
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
            axios.post(URL, novoHabito, config)
                .then(res => {
                    setAdicionar(false)
                    setDias([])
                    setNomeHabito("")
                    atualizarHabitos();
                })
                .catch(err => console.log(err));


        }
    }

    function selecionarDias(numero) {
        let listaDias = [];
        if (dias.includes(numero)) {
            for (let i = 0; i < dias.length; i++) {
                if (dias[i] !== numero) {
                    listaDias.push(dias[i])
                }
            }
            setDias(listaDias)
        } else {
            for (let i = 0; i < dias.length; i++) {
                listaDias.push(dias[i])
            }
            listaDias.push(numero)
            setDias(listaDias)
        }
    }

    function atualizarHabitos() {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.data.token}`
            }
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        axios.get(url, config)
            .then(res => {
                console.log(res);
                setHabitosServidor(res.data)
            })
            .catch(err => console.log(err))
    }

    function deletarHabito(id){
        var resposta = window.confirm("Você realmente deseja deletar esse habito?");
        if(resposta === true){
            console.log(id);
            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.data.token}`
                }
            }
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
            axios.delete(url, config)
                .then(res => {
                    console.log(res);
                    atualizarHabitos()
                })
                .catch(err => console.log(err))
        }
    }

    function HabitosAdicionados(props) {
        return (
            <HabitoAdicionado>
                <h1>{props.name}</h1>
                <div>
                    <Dia corFundo={props.days.includes(7) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(7) ? coresBotao[0] : coresBotao[1]}>D</Dia>
                    <Dia corFundo={props.days.includes(1) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(1) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                    <Dia corFundo={props.days.includes(2) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(2) ? coresBotao[0] : coresBotao[1]}>T</Dia>
                    <Dia corFundo={props.days.includes(3) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(3) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                    <Dia corFundo={props.days.includes(4) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(4) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                    <Dia corFundo={props.days.includes(5) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(5) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                    <Dia corFundo={props.days.includes(6) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(6) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                </div>
                <img onClick={() => deletarHabito(props.id)} src={lixeira} alt="lixeira" />
            </HabitoAdicionado>
        )
    }

    return (
        <>
            <Topo />
            <Fundo>
                <TelaHabitos>
                    <Titulo>
                        <span>Meus hábitos</span>
                        <button onClick={() => setAdicionar(true)}>+</button>
                    </Titulo>
                    {adicionar !== true ? 
                    <>
                        {habitosServidor.length === 0 ? <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span> : ""}
                    </>
                    :
                    <>
                        <NovoHabito>
                            <input type="text" placeholder="nome do hábito" value={nomeHabito} onChange={e => setNomeHabito(e.target.value)} />
                            <div >
                                <Dia onClick={() => selecionarDias(7)} corFundo={dias.includes(7) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(7) ? coresBotao[0] : coresBotao[1]}>D</Dia>
                                <Dia onClick={() => selecionarDias(1)} corFundo={dias.includes(1) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(1) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                                <Dia onClick={() => selecionarDias(2)} corFundo={dias.includes(2) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(2) ? coresBotao[0] : coresBotao[1]}>T</Dia>
                                <Dia onClick={() => selecionarDias(3)} corFundo={dias.includes(3) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(3) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                                <Dia onClick={() => selecionarDias(4)} corFundo={dias.includes(4) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(4) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                                <Dia onClick={() => selecionarDias(5)} corFundo={dias.includes(5) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(5) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                                <Dia onClick={() => selecionarDias(6)} corFundo={dias.includes(6) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(6) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                            </div>
                            <span>
                                <p onClick={() => setAdicionar(false)}>Cancelar</p>
                                <button onClick={criarHabito} >Salvar</button>
                            </span>
                        </NovoHabito>
                        {habitosServidor.length === 0 ? <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span> : ""}
                        </>
                    }
                    
                    {habitosServidor.map(h => <HabitosAdicionados id={h.id} key={h.id} name={h.name} days={h.days} />)}
                </TelaHabitos>
            </Fundo>
            <Menu />
        </>
    )
}



const HabitoAdicionado = styled.div`
width: 340px;
height: 91px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
padding-left: 15px;
padding-top: 13px;
position: relative;
margin-top: 10px;
h1{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #666666;
margin-bottom: 8px;
}
img{
    position: absolute;
    top: 11px;
    right: 10px;
}
`

const NovoHabito = styled.div`
width: 340px;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
padding-left: 19px;
padding-top: 18px;
span{
display: flex;
justify-content: end;
align-items: center;
margin-top: 29px;
p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
text-align: center;
color: #52B6FF; 
margin-right: 23px;
}
button{
width: 84px;
height: 35px;
background: #52B6FF;
border-radius: 4.6px;
border: thin;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 20px;
color: #FFFFFF;
margin-right: 30px;
}
}
input{
width: 303px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 25px;
margin-bottom: 10px;
color: #666666;
:placeholder-shown{
color: #DBDBDB;
}
}
`

const Dia = styled.button`
width: 30px;
height: 30px;
background: ${props => props.corFundo};
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: ${props => props.corLetra};
margin-right: 4px;

`

const TelaHabitos = styled.div`
width: 100%;
height: 100%;
padding-left: 17px;
padding-right: 18px;
padding-top: 18px;
padding-bottom: 35px;
span{
width: 338px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666;
display: flex;
margin-top: 29px;
}
`

const Titulo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 28px;
span{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
margin-top: 10px;
}
button{
width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.6px;
border: thin;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 27px;
line-height: 34px;
color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 5px;
}
`

const Fundo = styled.div`
width: 100%;
height: 100%;
background: #E5E5E5;
margin-top: 70px;
overflow: scroll;
`
