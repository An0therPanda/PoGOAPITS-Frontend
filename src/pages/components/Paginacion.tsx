import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

interface PaginacionProps {
  elementosTotatales: number;
  elementosPorPagina: number;
  onPageChange: (pagina: number) => void;
  paginaActual: number;
}

const Paginacion: React.FC<PaginacionProps> = ({
  elementosTotatales,
  elementosPorPagina,
  onPageChange,
  paginaActual,
}) => {
  const paginasTotales = Math.ceil(elementosTotatales / elementosPorPagina);

  function handleCambioPagina(pagina: number) {
    onPageChange(pagina);
  }

  return (
    <Pagination>
      <Pagination.First
        disabled={paginaActual === 1}
        onClick={() => handleCambioPagina(1)}
      />
      <Pagination.Prev
        disabled={paginaActual === 1}
        onClick={() => handleCambioPagina(paginaActual - 1)}
      />
      {[...Array(paginasTotales)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === paginaActual}
          onClick={() => handleCambioPagina(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={paginaActual === paginasTotales}
        onClick={() => handleCambioPagina(paginaActual + 1)}
      />
      <Pagination.Last
        disabled={paginaActual === paginasTotales}
        onClick={() => handleCambioPagina(paginasTotales)}
      />
    </Pagination>
  );
};

Paginacion.propTypes = {
  elementosTotatales: PropTypes.number.isRequired,
  elementosPorPagina: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  paginaActual: PropTypes.number.isRequired,
};

export default Paginacion;