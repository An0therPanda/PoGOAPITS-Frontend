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

function AgregarAtaqueCargado(): JSX.Element {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [ataquesCargados, setAtaquesCargados] = useState<Ataque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoTipos = await axios.get<Tipo[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/tipos`
      );
      const resultadosAtaquesCargados = await axios.get<Ataque[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/ataquescargados`
      );
      setTipos(resultadoTipos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _id = ataquesCargados.length + 1;
    const nombre = e.currentTarget.inputNombre.value;
    const tipo = e.currentTarget.selectTipo.value;
    const danopvp = e.currentTarget.inputDanoPVP.value;
    const energiapvp = e.currentTarget.inputEnergiaPVP.value;
    const danoporenergia = (danopvp / energiapvp).toFixed(2);
    const danopve = e.currentTarget.inputDanoPVE.value;
    const energiapve = e.currentTarget.inputEnergiaPVE.value;

    const body = {
      _id: _id,
      nombre: nombre,
      tipo: tipo,
      pvp: {
        dano: danopvp,
        energia: energiapvp,
        danoporenergia: danoporenergia,
      },
      pve: {
        dano: danopve,
        energia: energiapve,
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/ataquecargado`,
      body
    );
    console.log(response.data);
    setModalVisible(true);
  };

  function handleModalClose() {
    setModalVisible(false);
    navigate("/admin/listapokemones");
  }

  return (
    <Container>
      <h2 className="text-center mt-2 font-weight-bold">
        Agregar ataque cargado
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
          <br />
          <h4 className="text-center mt-2 font-weight-bold">PVE</h4>
          <Form.Label>Daño:</Form.Label>
          <Form.Control type="number" id="inputDanoPVE" />
          <Form.Label>Energía:</Form.Label>
          <Form.Control id="inputEnergiaPVE" />
          <br />
        </Form.Group>
        <Button variant="success" type="submit">
          Agregar ataque
        </Button>
      </Form>
      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ataque guardado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          El ataque cargado ha sido guardado exitosamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AgregarAtaqueCargado;
