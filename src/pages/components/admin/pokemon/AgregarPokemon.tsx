/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";

interface Tipo {
  id: number;
  label: string;
}

interface Ataque {
  id: number;
  nombre: string;
}

function AgregarPokemon(): JSX.Element {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [ataquesRapidos, setAtaquesRapidos] = useState<Ataque[]>([]);
  const [ataquesCargados, setAtaquesCargados] = useState<Ataque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoTipos = await axios.get<Tipo[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/tipos`
      );
      const resultadoAtaquesRapidos = await axios.get<Ataque[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquesrapidos`
      );
      const resultadosAtaquesCargados = await axios.get<Ataque[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquescargados`
      );
      setTipos(resultadoTipos.data);
      setAtaquesRapidos(resultadoAtaquesRapidos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const idpokedex = e.currentTarget.inputIdPokedex.value;
    const nombre = e.currentTarget.inputNombre.value;
    const label = e.currentTarget.inputLabel.value;
    const tipoprincipal = e.currentTarget.selectTipoPrincipal.value;
    const tiposecundario = e.currentTarget.selectTipoSecundario.value;
    const generacion = e.currentTarget.inputGeneracion.value;
    const ataquecargado1 = e.currentTarget.selectAtaqueCargadoPrincipal.value;
    const ataquecargado2 = e.currentTarget.selectAtaqueCargadoSecundario.value;
    const ataquerapido = e.currentTarget.selectAtaqueRapido.value;

    if (
      !idpokedex ||
      !nombre ||
      !label ||
      !tipoprincipal ||
      !generacion ||
      !ataquecargado1 ||
      !ataquerapido
    ) {
      alert("Por favor complete todos los campos.");
      return;
    }

    if (isNaN(parseInt(tipoprincipal))) {
      alert("Seleccione un tipo principal");
      return;
    }

    if (isNaN(parseInt(ataquecargado1))) {
      alert("Seleccione un ataque cargado principal");
      return;
    }

    if (isNaN(parseInt(ataquerapido))) {
      alert("Seleccione un tipo principal");
      return;
    }

    const body = {
      idpokedex: idpokedex,
      nombre: nombre,
      label: label,
      tipoprincipal: tipoprincipal,
      tiposecundario: tiposecundario,
      generacion: generacion,
      ataquecargado1: ataquecargado1,
      ataquecargado2: ataquecargado2,
      ataquerapido: ataquerapido,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/pokemon`,
      body,
      {
        withCredentials: true,
      }
    );
    console.log(response.status);
    setModalVisible(true);
  };

  function handleModalClose() {
    setModalVisible(false);
    navigate("/admin/listapokemones");
  }

  return (
    <Container style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 className="text-center mt-2 font-weight-bold">Agregar Pokémon</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>ID Pokédex:</Form.Label>
          <Form.Control type="number" id="inputIdPokedex" />
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" id="inputNombre" />
          <Form.Label>Label:</Form.Label>
          <Form.Control type="text" id="inputLabel" />
          <Form.Label>Tipo principal:</Form.Label>
          <Form.Select id="selectTipoPrincipal">
            <option value="">Selecciona el tipo principal</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.label}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Tipo secundario:</Form.Label>
          <Form.Select id="selectTipoSecundario">
            <option value="">Selecciona el tipo secundario</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.label}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Generación:</Form.Label>
          <Form.Control type="number" id="inputGeneracion" />
          <Form.Label>Ataque rápido:</Form.Label>
          <Form.Select id="selectAtaqueRapido">
            <option value="">Seleccina un ataque rápido</option>
            {ataquesRapidos.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Ataque cargado principal:</Form.Label>
          <Form.Select id="selectAtaqueCargadoPrincipal">
            <option value="">Seleccina el ataque cargado principal</option>
            {ataquesCargados.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Ataque cargado secundario:</Form.Label>
          <Form.Select id="selectAtaqueCargadoSecundario">
            <option value="">Seleccina el ataque cargado secundario</option>
            {ataquesCargados.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <br />
        </Form.Group>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" type="submit">
            Agregar Pokémon
          </Button>
        </div>
      </Form>
      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pokémon guardado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El pokémon ha sido guardado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AgregarPokemon;
