import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ContextoDeAutenticacao } from "../contexto/contexto"
import lixeira from "../img/Vector.png"
import { ThreeDots } from 'react-loader-spinner'

const coresBotao = ["#FFFFFF", "#DBDBDB", "#CFCFCF"]

export default function Habitos() {

    const { usuario, setPocentagem, porcentagem, setHabitosServidor, habitosServidor } = useContext(ContextoDeAutenticacao);
    const [adicionar, setAdicionar] = useState(false);
    const [dias, setDias] = useState([]);
    const [nomeHabito, setNomeHabito] = useState("")
    const [todosOsHabitos, setTodosOsHabitos] = useState([]);
    const [botaoSalvar, setBotaoSalvar] = useState("Salvar")
    const [fundoInput, setFundoInput] = useState("#FFFFFF")
    const [cor, setCor] = useState("#666666")

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.data.token}`
            }
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        axios.get(url, config)
            .then(res => {
                setTodosOsHabitos(res.data)
            })
            .catch(err => console.log(err))

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(URL, config)
            .then(res => {
                setHabitosServidor(res.data)
            })
            .catch(err => console.log(err))

    }, [adicionar]);

    useEffect(() => {
        let numeroDeHabitosDoDia = habitosServidor.length;
        let numeroDeHabitosConcluidos = 0;

        for (let i = 0; i < numeroDeHabitosDoDia; i++) {
            if (habitosServidor[i].done === true) {
                numeroDeHabitosConcluidos++
            }
        }

        let porcentagemConcluida = (numeroDeHabitosConcluidos / numeroDeHabitosDoDia) * 100;
        porcentagemConcluida = Math.round(porcentagemConcluida)
        setPocentagem(porcentagemConcluida);
    }, [habitosServidor]);

    function criarHabito() {
        if (nomeHabito !== "" && dias.length !== 0) {

            if(nomeHabito.length > 18){
                alert("Nome do habito maior do que o permitido!")
                return
            }

            setBotaoSalvar(<ThreeDots
                height="40"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />)
            setFundoInput("#F2F2F2")
            setCor("#AFAFAF")

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

            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
            axios.post(URL, novoHabito, config)
                .then(res => {
                    setAdicionar(false)
                    setDias([])
                    setNomeHabito("")
                    atualizarHabitos();
                    setBotaoSalvar("Salvar")
                    setFundoInput("#FFFFFF")
                    setCor("#666666")
                })
                .catch(err => {
                    alert(err.response.data.message)
                    setDias([])
                    setNomeHabito("")
                    atualizarHabitos();
                    setBotaoSalvar("Salvar")
                    setFundoInput("#FFFFFF")
                    setCor("#666666")
                });

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
                setTodosOsHabitos(res.data)
            })
            .catch(err => console.log(err))
    }

    function deletarHabito(id) {
        var resposta = window.confirm("Você realmente deseja deletar esse habito?");
        if (resposta === true) {
            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.data.token}`
                }
            }
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
            axios.delete(url, config)
                .then(res => {
                    atualizarHabitos()
                })
                .catch(err => console.log(err))
        }
    }

    function HabitosAdicionados(props) {
        return (
            <HabitoAdicionado>
                <h1 data-identifier="habit-name">{props.name}</h1>
                <div>
                    <Dia corFundo={props.days.includes(0) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(0) ? coresBotao[0] : coresBotao[1]}>D</Dia>
                    <Dia corFundo={props.days.includes(1) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(1) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                    <Dia corFundo={props.days.includes(2) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(2) ? coresBotao[0] : coresBotao[1]}>T</Dia>
                    <Dia corFundo={props.days.includes(3) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(3) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                    <Dia corFundo={props.days.includes(4) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(4) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                    <Dia corFundo={props.days.includes(5) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(5) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                    <Dia corFundo={props.days.includes(6) ? coresBotao[2] : coresBotao[0]} corLetra={props.days.includes(6) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                </div>
                <img data-identifier="delete-habit-btn" onClick={() => deletarHabito(props.id)} src={lixeira} alt="lixeira" />
            </HabitoAdicionado>
        )
    }

    return (
            <Fundo>
                <Topo />
                <TelaHabitos>
                    <Titulo>
                        <span>Meus hábitos</span>
                        <button data-identifier="create-habit-btn" onClick={() => setAdicionar(true)}>+</button>
                    </Titulo>
                    {adicionar !== true ?
                        <>
                            {todosOsHabitos.length === 0 ? <span data-identifier="no-habit-message">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span> : ""}
                        </>
                        :
                        <>
                            <NovoHabito>
                                <InputLogin data-identifier="input-habit-name" cor={cor} corFundo={fundoInput} type="text" placeholder="nome do hábito" value={nomeHabito} onChange={e => setNomeHabito(e.target.value)} />
                                <div >
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(0)} corFundo={dias.includes(0) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(0) ? coresBotao[0] : coresBotao[1]}>D</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(1)} corFundo={dias.includes(1) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(1) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(2)} corFundo={dias.includes(2) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(2) ? coresBotao[0] : coresBotao[1]}>T</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(3)} corFundo={dias.includes(3) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(3) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(4)} corFundo={dias.includes(4) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(4) ? coresBotao[0] : coresBotao[1]}>Q</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(5)} corFundo={dias.includes(5) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(5) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                                    <Dia data-identifier="week-day-btn" onClick={() => selecionarDias(6)} corFundo={dias.includes(6) ? coresBotao[2] : coresBotao[0]} corLetra={dias.includes(6) ? coresBotao[0] : coresBotao[1]}>S</Dia>
                                </div>
                                <span>
                                    <p data-identifier="cancel-habit-create-btn" onClick={() => setAdicionar(false)}>Cancelar</p>
                                    <button data-identifier="save-habit-create-btn" onClick={criarHabito} >{botaoSalvar}</button>
                                </span>
                            </NovoHabito>
                            {todosOsHabitos.length === 0 ? <span data-identifier="no-habit-message">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span> : ""}
                        </>
                    }

                    {todosOsHabitos.map(h => <HabitosAdicionados id={h.id} key={h.id} name={h.name} days={h.days} />)}
                </TelaHabitos>
                <Menu porcentagem={porcentagem} />
            </Fundo>
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
display: flex;
align-items: center;
justify-content: center;
}
}
`
const InputLogin = styled.input`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
width: 303px;
height: 45px;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-bottom: 6px;
color: ${props => props.cor};
background-color: ${props => props.corFundo};
::placeholder{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #DBDBDB;
background: ${props => props.corFundo};
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
margin-bottom: 70px;
overflow: scroll;
`
