import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";

interface Pokemon {
  idpokedex: number;
  label: string;
  ataquerapido: Ataque;
  ataquecargado1: Ataque;
  ataquecargado2: Ataque;
}

interface Ataque {
  id: number;
  nombre: string;
}

function ModificarPokemon(): JSX.Element {
  const { idPokemon } = useParams<{ idPokemon: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [ataquesRapidos, setAtaquesRapidos] = useState<Ataque[]>([]);
  const [ataquesCargados, setAtaquesCargados] = useState<Ataque[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resultadoPokemon = await axios.get<Pokemon>(
        `http://localhost:8000/api/pokemon/${idPokemon}`
      );
      const resultadoAtaquesRapidos = await axios.get<Ataque[]>(
        "http://localhost:8000/api/ataquesrapidos"
      );
      const resultadosAtaquesCargados = await axios.get<Ataque[]>(
        "http://localhost:8000/api/ataquescargados"
      );

      setPokemon(resultadoPokemon.data);
      setAtaquesRapidos(resultadoAtaquesRapidos.data);
      setAtaquesCargados(resultadosAtaquesCargados.data);
    };
    fetchData();
  }, [idPokemon]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const idAtaqueRapido = e.currentTarget.selectAtaqueRapido.value;
    const idAtaqueCargado1 = e.currentTarget.selectAtaqueCargado1.value;
    const idAtaqueCargado2 = e.currentTarget.selectAtaqueCargado2.value;

    const body = {
      idAtaqueRapido: idAtaqueRapido,
      idAtaqueCargado1: idAtaqueCargado1,
      idAtaqueCargado2: idAtaqueCargado2,
    };

    axios
      .patch(`http://localhost:8000/api/pokemon/${idPokemon}`, body, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setModalVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleModalClose() {
    setModalVisible(false);
    navigate("/admin/listapokemones");
  }

  if (pokemon === null) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
      <h2 className="text-center mt-2 font-weight-bold">
        Modificar pokémon con ID {pokemon.idpokedex} - {pokemon.label}
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Ataque rápido:</Form.Label>
          <Form.Select
            defaultValue={pokemon.ataquerapido.id}
            id="selectAtaqueRapido"
            name="selectAtaqueRapido"
          >
            <option
              key={pokemon.ataquerapido.id}
              value={pokemon.ataquerapido.id}
            >
              {pokemon.ataquerapido.nombre}
            </option>
            {ataquesRapidos.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Ataque cargado principal:</Form.Label>
          <Form.Select
            defaultValue={pokemon.ataquecargado1.id}
            id="selectAtaqueCargado1"
            name="selectAtaqueCargado1"
          >
            <option
              key={pokemon.ataquecargado1.id}
              value={pokemon.ataquecargado1.id}
            >
              {pokemon.ataquecargado1.nombre}
            </option>
            {ataquesCargados.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Ataque cargado secundario:</Form.Label>
          <Form.Select
            defaultValue={pokemon.ataquecargado2.id}
            id="selectAtaqueCargado2"
            name="selectAtaqueCargado2"
          >
            <option
              key={pokemon.ataquecargado2.id}
              value={pokemon.ataquecargado2.id}
            >
              {pokemon.ataquecargado2.nombre}
            </option>
            {ataquesCargados.map((ataque) => (
              <option key={ataque.id} value={ataque.id}>
                {ataque.nombre}
              </option>
            ))}
          </Form.Select>
          <br />
        </Form.Group>
        <Button variant="success" type="submit">
          Guardar cambios
        </Button>
      </Form>
      <Modal show={modalVisible} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambios guardados</Modal.Title>
        </Modal.Header>
        <Modal.Body>El pokémon ha sido modificado exitosamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ModificarPokemon;
