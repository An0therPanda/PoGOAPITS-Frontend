/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Paginacion from "../../Paginacion";

interface Pokemon {
  idpokedex: number;
  label: string;
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

function ListaPokemones(): JSX.Element {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [elementosPorPagina] = useState<number>(15);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get<Pokemon[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/pokemones`
      );
      setPokemon(resultado.data);
    };
    fetchData();
  }, []);

  const indexUltimoItem: number = paginaActual * elementosPorPagina;
  const indexPrimerItem: number = indexUltimoItem - elementosPorPagina;
  const itemsActuales: Pokemon[] = pokemon.slice(
    indexPrimerItem,
    indexUltimoItem
  );

  const paginacion = (numeroPagina: number) => setPaginaActual(numeroPagina);

  return (
    <Container>
      <h2 className="text-center mt-2 font-weight-bold">Pokémones</h2>
      <Container className="container-fluid">
        <Table
          bordered
          hover
          size="m"
          className="position-relative"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-danger text-center">
            <tr>
              <th className="text-white align-middle" rowSpan={2}>
                Pokemon
              </th>
              <th className="text-white" colSpan={3}>
                Ataques
              </th>
              <th className="text-white align-middle" rowSpan={2}>
                Acciones
              </th>
            </tr>
            <tr>
              <th className="text-white">Ataque rápido</th>
              <th className="text-white" colSpan={2}>
                Ataque Cargado
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {itemsActuales.map((pokemon) => (
              <tr key={pokemon.idpokedex}>
                <td>{pokemon.label}</td>
                <td>{pokemon.ataquerapido.nombre}</td>
                <td colSpan={pokemon.ataquecargado2 ? 1 : 2}>
                  {pokemon.ataquecargado1.nombre}
                </td>
                {pokemon.ataquecargado2 && (
                  <td>{pokemon.ataquecargado2.nombre}</td>
                )}
                <td>
                  <Button variant="success">
                    <Link
                      className="text-white"
                      to={`/admin/modificarpokemon/${pokemon.idpokedex}`}
                    >
                      Modificar
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Paginacion
            elementosTotatales={pokemon.length}
            elementosPorPagina={elementosPorPagina}
            onPageChange={paginacion}
            paginaActual={paginaActual}
          />
        </div>
      </Container>
    </Container>
  );
}

export default ListaPokemones;
