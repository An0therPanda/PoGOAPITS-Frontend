import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props{
  onLogout: () => void;
}

const Logout = ({onLogout}: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        onLogout();
        navigate("/");
        await axios.post("http://localhost:8000/api/auth/logout");        
      } catch (error){
        console.error(error);
      }
    };
    logout();
  }, [onLogout, navigate])
  return null;
}

export default Logout;