import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import { setLoading } from "../redux/features/users/usersSlice";
import { useDispatch } from "react-redux";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(setLoading(false));
      setIsInitialLoad(false);
      return;
    }

    if (!user.email) {
      navigate("/login", { state: { from: location } });
    }
  }, [user, location, navigate, isInitialLoad, dispatch]);

  if (isLoading || isInitialLoad) {
    // Display a loading state while the user state is being loaded or during the initial load
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
