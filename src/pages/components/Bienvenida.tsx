/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import logo from "../assets/images/logo.png";

function Bienvenida() {
  return (
    <div className="text-center">
      <h1>Bienvenido a PoGOAPI!</h1>
      <img
        src={logo}
        width="500"
        height="260"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <div>
        Este proyecto nació para facilitar la búsqueda de información relevante
        de pokémones, ataques y sus estadísticas.
      </div>
      <div>
        Por ahora solo contamos con la primera generación, pero a medida que
        pase el tiempo se irán agregando más generaciones.
      </div>
    </div>
  );
}

export default Bienvenida;
