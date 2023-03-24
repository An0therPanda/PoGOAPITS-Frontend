import React, { useState, useEffect } from "react";
import axios from "axios";
import TablaEficacia from "./TablaEficacia";

interface Tipo {
  id: number;
  label: string;
}

function Eficacias(): JSX.Element {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get<Tipo[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/tipos`
      );
      setTipos(resultado.data);
    };
    fetchData();
  }, []);

  function handleTipoSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTipo = parseInt(event.target.value);
    setTipoSeleccionado(selectedTipo);
  }

  return (
    <div className="center-block">
      <h2 className="text-center mt-2 font-weight-bold">
        Eficacia de los ataques
      </h2>
      <div className="d-flex justify-content-center">
        <label style={{ marginRight: "10px" }}>Selecciona un tipo: </label>
        <select className="ml-2" onChange={handleTipoSelected}>
          <option>Selecciona un tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="d-flex flex-row w-100 justify-content-center">
        <div>
          {tipoSeleccionado && (
            <TablaEficacia idTipo={tipoSeleccionado} idEficacia={1} />
          )}
        </div>
        <div>
          {tipoSeleccionado && (
            <TablaEficacia idTipo={tipoSeleccionado} idEficacia={2} />
          )}
        </div>
        <div>
          {tipoSeleccionado && (
            <TablaEficacia idTipo={tipoSeleccionado} idEficacia={3} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Eficacias;
