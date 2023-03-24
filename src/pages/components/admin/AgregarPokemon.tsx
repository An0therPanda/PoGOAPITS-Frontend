import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Modal } from "react-bootstrap";
import useCookies from "react-cookie/cjs/useCookies";

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
  const [cookies, setCookies] = useCookies(["PoGO-AUTH"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoTipos = await axios.get<Tipo[]>(
        "http://localhost:8000/api/tipos"
      );
      const resultadoAtaquesRapidos = await axios.get<Ataque[]>(
        "http://localhost:8000/api/ataquesrapidos"
      );
      const resultadosAtaquesCargados = await axios.get<Ataque[]>(
        "http://localhost:8000/api/ataquescargados"
      );
      setTipos(resultadoTipos.data);
      setAtaquesRapidos(resultadoAtaquesRapidos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      idpokedex: e.currentTarget.inputIdPokedex.value,
      nombre: e.currentTarget.inputNombre.value,
      label: e.currentTarget.inputLabel.value,
      tipoprincipal: e.currentTarget.selectTipoPrincipal.value,
      tiposecundario: e.currentTarget.selectTipoSecundario.value,
      generacion: e.currentTarget.inputGeneracion.value,
      ataquecargado1: e.currentTarget.selectAtaqueCargadoPrincipal.value,
      ataquecargado2: e.currentTarget.selectAtaqueCargadoSecundario.value,
      ataquerapido: e.currentTarget.selectAtaqueRapido.value,
    };

    const response = await axios.post(
      "http://localhost:8000/api/pokemon",
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
    navigate("/admin/listapokemones");
  }

  return (
    <Container>
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
          <Form.Control type="text" id="inputGeneracion" />
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
        <Button variant="success" type="submit">
          Agregar Pokémon
        </Button>
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
