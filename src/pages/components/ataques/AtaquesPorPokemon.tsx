/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import Paginacion from "../Paginacion";

interface Pokemon {
  idpokedex: number;
  label: string;
  tipoprincipal: {
    label: string;
  };
  tiposecundario?: {
    label: string;
  };
  generacion: number;
  ataquerapido: {
    nombre: string;
  };
  ataquecargado1: {
    nombre: string;
  };
  ataquecargado2?: {
    nombre: string;
  };
}

function ListaAtaquesPokemon(): JSX.Element {
  const [ataquesPokemon, setAtaquesPokemon] = useState<Pokemon[]>([]);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [elementosPorPagina] = useState<number>(13);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/pokemones`
      );
      setAtaquesPokemon(resultado.data);
    };
    fetchData();
  }, [paginaActual]);

  const indexUltimoItem = paginaActual * elementosPorPagina;
  const indexPrimerItem = indexUltimoItem - elementosPorPagina;
  const itemsActuales = ataquesPokemon.slice(indexPrimerItem, indexUltimoItem);

  const paginacion = (numeroPagina: number) => setPaginaActual(numeroPagina);

  return (
    <Container className="position-relative">
      <h2 className="text-center mt-2 font-weight-bold">
        Mejores ataques por Pokémon
      </h2>
      <Table
        bordered
        hover
        size="m"
        className="position-relative"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="text-center bg-danger">
          <tr>
            <th
              className="text-white align-middle w-20"
              rowSpan={2}
              style={{ width: "6%" }}
            >
              Pokédex
            </th>
            <th
              className="text-white align-middle w-20"
              rowSpan={2}
              style={{ width: "11%" }}
            >
              Pokemon
            </th>
            <th
              className="text-white align-middle w-30"
              colSpan={2}
              rowSpan={2}
              style={{ width: "25%" }}
            >
              Tipos
            </th>
            <th
              className="text-white align-middle w-10"
              rowSpan={2}
              style={{ width: "8%" }}
            >
              Generación
            </th>
            <th
              className="text-white w-50"
              colSpan={3}
              style={{ width: "50%" }}
            >
              Ataques
            </th>
          </tr>
          <tr>
            <th className="text-white" style={{ width: "20%" }}>
              Ataque rápido
            </th>
            <th className="text-white" colSpan={2} style={{ width: "30%" }}>
              Ataque cargado
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {itemsActuales.map((pokemon) => (
            <tr key={pokemon.idpokedex}>
              <td>{pokemon.idpokedex}</td>
              <td>{pokemon.label}</td>
              <td colSpan={pokemon.tiposecundario ? 1 : 2}>
                {pokemon.tipoprincipal.label}
              </td>
              {pokemon.tiposecundario && (
                <td>{pokemon.tiposecundario.label}</td>
              )}
              <td>{pokemon.generacion}</td>
              <td>{pokemon.ataquerapido.nombre}</td>
              <td colSpan={pokemon.ataquecargado2 ? 1 : 2}>
                {pokemon.ataquecargado1.nombre}
              </td>
              {pokemon.ataquecargado2 && (
                <td>{pokemon.ataquecargado2.nombre}</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Paginacion
          elementosTotatales={ataquesPokemon.length}
          elementosPorPagina={elementosPorPagina}
          onPageChange={paginacion}
          paginaActual={paginaActual}
        />
      </div>
    </Container>
  );
}

export default ListaAtaquesPokemon;
