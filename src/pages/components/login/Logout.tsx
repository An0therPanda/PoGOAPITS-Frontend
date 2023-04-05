/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogout: () => void;
}

const Logout = ({ onLogout }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        onLogout();
        navigate("/");
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`
        );
      } catch (error) {
        console.error(error);
      }
    };
    logout();
  }, [onLogout, navigate]);
  return null;
};

export default Logout;
