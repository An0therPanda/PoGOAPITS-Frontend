import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

interface Props {
  idEficacia: number;
  idTipo: number;
}

const TablaEficacia: React.FC<Props> = ({ idEficacia, idTipo }) => {
  const [eficacia, setEficacia] = useState<Array<any>>([]);
  let tituloTabla = "";

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get<Array<any>>(
        `${process.env.REACT_APP_BACKEND_URL}/api/eficacia/${idEficacia}/${idTipo}`
      );
      setEficacia(resultado.data);
    };
    fetchData();
  }, [idEficacia, idTipo]);

  if (idEficacia === 1) {
    tituloTabla = "Doble daño (x2)";
  } else if (idEficacia === 2) {
    tituloTabla = "Mitad de daño (x0.5)";
  } else if (idEficacia === 3) {
    tituloTabla = "Sin daño (x0)";
  }

  return (
    <Container className="position-relative">
      <div className="d-flex justify-content-center">
        <Table bordered hover className="position-relative">
          <thead className="text-center bg-danger">
            <tr>
              <th className="text-white">{tituloTabla}</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {eficacia.map((eficacia) => (
              <tr key={eficacia.tipo_afectado.id}>
                <td>{eficacia.tipo_afectado.nombretipo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TablaEficacia;
