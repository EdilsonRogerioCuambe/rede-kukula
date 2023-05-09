import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  AddNoticia,
  Contacto,
  Noticias,
  Depoimentos,
  AddDepoimento,
  Sobre,
  Noticia,
  AddDoc,
  Docs,
} from "./pages";
import { Header } from "./components";
import DocsProvíncia from "./pages/docs/DocsProvincia";
import { Login } from "./components";

function MainRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-noticia" element={<AddNoticia />} />
        <Route path="/contato" element={<Contacto />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/DocumentosporProvincia" element={<DocsProvíncia />} />
        <Route path="/depoimentos" element={<Depoimentos />} />
        <Route path="/add-depoimento" element={<AddDepoimento />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/noticia/:id" element={<Noticia />} />
        <Route path="/add-doc" element={<AddDoc />} />
        <Route path="/documentos" element={<Docs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default MainRoutes;