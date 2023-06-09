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

function AgregarAtaqueRapido(): JSX.Element {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [ataquesRapidos, setAtaquesRapidos] = useState<Ataque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoTipos = await axios.get<Tipo[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/tipos`
      );
      const resultadosAtaquesRapidos = await axios.get<Ataque[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquesrapidos`
      );
      setTipos(resultadoTipos.data);
      setAtaquesRapidos(resultadosAtaquesRapidos.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _id = ataquesRapidos.length + 1;
    const nombre = e.currentTarget.inputNombre.value;
    const tipo = e.currentTarget.selectTipo.value;
    const danopvp = e.currentTarget.inputDanoPVP.value;
    const energiapvp = e.currentTarget.inputEnergiaPVP.value;
    const turnopvp = e.currentTarget.inputTurnoPVP.value;
    const danopve = e.currentTarget.inputDanoPVE.value;
    const energiapve = e.currentTarget.inputEnergiaPVE.value;

    if (
      !nombre ||
      !tipo ||
      !danopvp ||
      !energiapvp ||
      !turnopvp ||
      !danopve ||
      !energiapve
    ) {
      alert("Por favor complete todos los campos.");
      return;
    }

    if (isNaN(parseInt(tipo))) {
      alert("Seleccione un tipo");
      return;
    }

    const body = {
      _id: _id,
      nombre: nombre,
      tipo: tipo,
      pvp: {
        dano: danopvp,
        energia: energiapvp,
        turno: turnopvp,
      },
      pve: {
        dano: danopve,
        energia: energiapve,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/ataquerapido`,
      body,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    setModalVisible(true);
  };

  function handleModalClose() {
    setModalVisible(false);
    navigate("/admin/ataques");
  }

  return (
    <Container style={{ maxWidth: "800px" }}>
      <h2 className="text-center mt-2 font-weight-bold">
        Agregar ataque rápido
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" id="inputNombre" />
          <Form.Label>Tipo:</Form.Label>
          <Form.Select id="selectTipo">
            <option>Selecciona el tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.label}
              </option>
            ))}
          </Form.Select>
          <br />
          <h4 className="text-center mt-2 font-weight-bold">PVP</h4>
          <Form.Label>Daño:</Form.Label>
          <Form.Control type="number" id="inputDanoPVP" />
          <Form.Label>Energia:</Form.Label>
          <Form.Control type="number" id="inputEnergiaPVP" />
          <Form.Label>Turno:</Form.Label>
          <Form.Control type="number" id="inputTurnoPVP" />
          <br />
          <h4 className="text-center mt-2 font-weight-bold">PVE</h4>
          <Form.Label>Daño:</Form.Label>
          <Form.Control type="number" id="inputDanoPVE" />
          <Form.Label>Energía:</Form.Label>
          <Form.Control type="number" id="inputEnergiaPVE" />
          <br />
        </Form.Group>
        <div className="d-flex justify-content-center mt-3">
          <Button variant="success" type="submit">
            Agregar ataque
          </Button>
        </div>
      </Form>
      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ataque guardado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El ataque rápido ha sido guardado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AgregarAtaqueRapido;
