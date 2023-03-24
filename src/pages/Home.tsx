import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgregarAtaqueCargado from "./components/admin/AgregarAtaqueCargado";
import AgregarAtaqueRapido from "./components/admin/AgregarAtaqueRapido";
import AgregarPokemon from "./components/admin/AgregarPokemon";
import Ataques from "./components/admin/Ataques";
import ListaPokemones from "./components/admin/ListaPokemones";
import ModificarAtaqueCargado from "./components/admin/ModificarAtaqueCargado";
import ModificarAtaqueRapido from "./components/admin/ModificarAtaqueRapido";
import ModificarPokemon from "./components/admin/ModificarPokemon";
import NavBarAdmin from "./components/admin/NavBarAdmin";
import ListaAtaquesPokemon from "./components/AtaquesPorPokemon";
import Eficacias from "./components/Eficacias";
import ListaAtaques from "./components/ListaAtaques";
import ListaTipos from "./components/ListaTipos";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/Navbar";
import Bienvenida from "./components/Bienvenida";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true.toString());
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }

  return (
    <BrowserRouter>
      {isLoggedIn ? <NavBarAdmin /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="/tipos" element={<ListaTipos />} />
        <Route path="/eficacias" element={<Eficacias />} />
        <Route path="/ataquespokemon" element={<ListaAtaquesPokemon />} />
        <Route path="/listaataques" element={<ListaAtaques />} />
        <Route path="/admin/listapokemones" element={<ListaPokemones />} />
        <Route
          path="/admin/modificarpokemon/:idPokemon"
          element={<ModificarPokemon />}
        />
        <Route path="/admin/ataques" element={<Ataques />} />
        <Route
          path="/admin/modificarataquerapido/:idAtaque"
          element={<ModificarAtaqueRapido />}
        />
        <Route
          path="/admin/modificarataquecargado/:idAtaque"
          element={<ModificarAtaqueCargado />}
        />
        <Route path="/admin/agregarpokemon" element={<AgregarPokemon />} />
        <Route
          path="/admin/agregarataquecargado"
          element={<AgregarAtaqueCargado />}
        />
        <Route
          path="/admin/agregarataquerapido"
          element={<AgregarAtaqueRapido />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Home;
