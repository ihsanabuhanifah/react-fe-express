import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../redux/actions/authAction";
export default function PrivateRoute({ children }) {
  let auth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  let token = localStorage.getItem("token");
  const getAuthMe = async () => {
    const response = await dispatch(authMe());
    console.log(response.status);
    if (response.status === "Success") {
      auth = true;
    }

    console.log(auth);
  };

  React.useEffect(() => {
    if (!auth) {
      if (token !== undefined) {
        getAuthMe();
      }
    }
  }, [auth]);

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return token !== undefined ? children : <Navigate to="/login" />;
  }
}
//
