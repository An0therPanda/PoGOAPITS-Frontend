/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgregarAtaqueCargado from "./components/admin/ataques/AgregarAtaqueCargado";
import AgregarAtaqueRapido from "./components/admin/ataques/AgregarAtaqueRapido";
import AgregarPokemon from "./components/admin/pokemon/AgregarPokemon";
import Ataques from "./components/admin/ataques/Ataques";
import ListaPokemones from "./components/admin/pokemon/ListaPokemones";
import ModificarAtaqueCargado from "./components/admin/ataques/ModificarAtaqueCargado";
import ModificarAtaqueRapido from "./components/admin/ataques/ModificarAtaqueRapido";
import ModificarPokemon from "./components/admin/pokemon/ModificarPokemon";
import NavBarAdmin from "./components/admin/NavBarAdmin";
import ListaAtaquesPokemon from "./components/ataques/AtaquesPorPokemon";
import Eficacias from "./components/tipos/Eficacias";
import ListaAtaques from "./components/ataques/ListaAtaques";
import ListaTipos from "./components/tipos/ListaTipos";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
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
