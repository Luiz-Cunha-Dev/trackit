import Login from "./login/login";
import Cadastro from "./login/cadastro";
import Habitos from "./habitos/habitos";
import Historico from "./habitos/historico";
import Hoje from "./habitos/hoje";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/habitos" element={<Habitos/>}/>
      <Route path="hoje" element={<Hoje/>}/>
      <Route path="historico" element={<Historico/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
