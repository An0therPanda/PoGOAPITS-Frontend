import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

type Tipo = {
  nombre: string;
  label: string;
};

const ListaTipos: React.FC = () => {
  const [tipos, setTipos] = useState<Tipo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get<Tipo[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/tipos`
      );
      setTipos(resultado.data);
    };
    fetchData();
  }, []);

  return (
    <Container className="position-relative">
      <h2 className="text-center mt-2 font-weight-bold">Tipos de Pokémon</h2>
      <div className="d-flex justify-content-center">
        <Table bordered hover className="position-relative w-50">
          <thead className="text-center">
            <tr>
              <th className="w-40">Ícono</th>
              <th className="w-60">Nombre</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {tipos.map((tipo: Tipo) => (
              <tr key={tipo.nombre}>
                <td>
                  <img
                    src={require(`../assets/icons/tipos/${tipo.nombre}.png`)}
                    alt="icon"
                    width="30"
                    height="30"
                  />
                </td>
                <td>{tipo.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ListaTipos;
