import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import Paginacion from "./Paginacion";

interface AtaqueRapido {
  id: number;
  nombre: string;
  tipo: {
    label: string;
    id: number;
  };
  pvp: {
    dano: number;
    energia: number;
    turno: number;
  };
  pve: {
    dano: number;
    energia: number;
  };
}

interface AtaqueCargado {
  id: number;
  nombre: string;
  tipo: {
    label: string;
    id: number;
  };
  pvp: {
    dano: number;
    energia: number;
    danoporenergia: {
      $numberDecimal: string;
    };
  };
  pve: {
    dano: number;
    energia: number;
  };
}

function ListaAtaques() {
  const [ataquesRapidos, setAtaquesRapidos] = useState<AtaqueRapido[]>([]);
  const [ataquesCargados, setAtaquesCargados] = useState<AtaqueCargado[]>([]);
  const [paginaActualAtaqueRapido, setPaginaActualAtaqueRapido] = useState(1);
  const [paginaActualAtaqueCargado, setPaginaActualAtaqueCargado] = useState(1);
  const [elementosPorPagina] = useState(13);

  useEffect(() => {
    const fetchData = async () => {
      const resultadosAtaquesRapidos = await axios.get<AtaqueRapido[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquesrapidos`
      );
      const resultadosAtaquesCargados = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquescargados`
      );
      setAtaquesRapidos(resultadosAtaquesRapidos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, [paginaActualAtaqueCargado, paginaActualAtaqueRapido]);

  const indexUltimoItemAtaqueRapido =
    paginaActualAtaqueRapido * elementosPorPagina;
  const indexPrimerItemAtaqueRapido =
    indexUltimoItemAtaqueRapido - elementosPorPagina;
  const itemsActualesAtaqueRapido = ataquesRapidos.slice(
    indexPrimerItemAtaqueRapido,
    indexUltimoItemAtaqueRapido
  );

  const indexUltimoItem = paginaActualAtaqueCargado * elementosPorPagina;
  const indexPrimerItemAtaque = indexUltimoItem - elementosPorPagina;
  const itemsActualesAtaqueCargado = ataquesCargados.slice(
    indexPrimerItemAtaque,
    indexUltimoItem
  );

  const paginacionAtaqueRapido = (numeroPagina: number) =>
    setPaginaActualAtaqueRapido(numeroPagina);

  const paginacionAtaqueCargado = (numeroPagina: number) =>
    setPaginaActualAtaqueCargado(numeroPagina);

  return (
    <Container className="position-relative">
      <h2 className="text-center mt-2 font-weight-bold">
        Lista de ataques rápidos
      </h2>
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
                Nombre
              </th>
              <th className="text-white align-middle" rowSpan={2}>
                Tipo
              </th>
              <th className="text-white" colSpan={3}>
                PVP
              </th>
              <th className="text-white" colSpan={2}>
                PVE
              </th>
            </tr>
            <tr>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
              <th className="text-white">Turno</th>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {itemsActualesAtaqueRapido.map((ataque) => (
              <tr key={ataque.id}>
                <td>{ataque.nombre}</td>
                <td>{ataque.tipo.label}</td>
                <td>{ataque.pvp.dano}</td>
                <td>{ataque.pvp.energia}</td>
                <td>{ataque.pvp.turno}</td>
                <td>{ataque.pve.dano}</td>
                <td>{ataque.pve.energia}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Paginacion
            elementosTotatales={ataquesRapidos.length}
            elementosPorPagina={elementosPorPagina}
            onPageChange={paginacionAtaqueRapido}
            paginaActual={paginaActualAtaqueRapido}
          />
        </div>
      </Container>
      <h2 className="text-center mt-2 font-weight-bold">
        Lista de ataques cargados
      </h2>
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
              <th className="text-white" rowSpan={2}>
                Nombre
              </th>
              <th className="text-white" rowSpan={2}>
                Tipo
              </th>
              <th className="text-white" colSpan={3}>
                PVP
              </th>
              <th className="text-white" colSpan={2}>
                PVE
              </th>
            </tr>
            <tr>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
              <th className="text-white">DPE</th>
              <th className="text-white">Daño</th>
              <th className="text-white">Energía</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {itemsActualesAtaqueCargado.map((ataque) => (
              <tr key={ataque.id}>
                <td>{ataque.nombre}</td>
                <td>{ataque.tipo.label}</td>
                <td>{ataque.pvp.dano}</td>
                <td>{ataque.pvp.energia}</td>
                <td>{ataque.pvp.danoporenergia.$numberDecimal}</td>
                <td>{ataque.pve.dano}</td>
                <td>{ataque.pve.energia}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Paginacion
            elementosTotatales={ataquesCargados.length}
            elementosPorPagina={elementosPorPagina}
            onPageChange={paginacionAtaqueCargado}
            paginaActual={paginaActualAtaqueCargado}
          />
        </div>
      </Container>
    </Container>
  );
}
export default ListaAtaques;
