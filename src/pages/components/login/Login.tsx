/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Usuario {
  username: string;
  password: string;
}

interface Props {
  onLogin: () => void;
}

const Login = ({ onLogin }: Props) => {
  const [usuario, setUsuario] = useState<Usuario>({
    username: "",
    password: "",
  });
  const [cookies, setCookies] = useCookies(["PoGO-AUTH"]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!usuario.username || !usuario.password) {
        setError("Por favor ingrese un usuario y contraseña válidos.");
        return;
      }
      const respuesta = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        usuario
      );
      console.log(respuesta.status);

      if (respuesta.status !== 200) {
        setError("Usuario y/o contraseña incorrectos.");
        return;
      } else {
        console.log(respuesta.status);
        setCookies("PoGO-AUTH", respuesta.data.authentication.sessionToken);
        onLogin();
        navigate("/admin/listapokemones");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div style={{ border: "2px solid red", padding: "20px" }}>
        <div
          style={{
            marginBottom: "5px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Inicia sesión
        </div>
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <Form.Label>Usuario: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={usuario.username}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Form.Label>Contraseña: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={usuario.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center">
            <Button variant="success" type="submit">
              Iniciar sesión
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
