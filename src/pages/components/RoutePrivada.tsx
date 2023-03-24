import { Route, Navigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
  path: string;
  element: React.ReactNode;
}

const RoutePrivada = ({ isLoggedIn, path, element }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={element} />;
};

export default RoutePrivada;