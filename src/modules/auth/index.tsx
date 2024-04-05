import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, userActions } from "../../contexts/UserContext";
import FormLogin from "./components/FormLogin";
import useNotification from "../../hooks/useNotification";
import { ReactComponent as Logo } from "../../assets/logo-simplestate.svg";
import "./styles.css";

const Auth = () => {
  const {
    state: { error, loading, logged },
    dispatch,
  } = useUser();
  const navigate = useNavigate();
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (logged) {
      navigate("/investment");
    }
  }, [logged]);

  useEffect(() => {
    if (error) {
      openNotificationWithIcon("error", error);
    }
  }, [error]);

  const onLogin = ({ email, password }: { email: string; password: string }) =>
    dispatch(userActions.login({ email, password })(dispatch));

  const onFieldsChange = (_: any, allFields: any) => {
    const isEmpty = allFields.every((field: any) => !field.value);
    setIsDisabled(isEmpty);
  };

  return (
    <div className="container">
      {contextHolder}
      <Logo />
      <p className="login-title">Iniciar sesión</p>
      <FormLogin
        onLogin={onLogin}
        onFieldsChange={onFieldsChange}
        loading={loading}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Auth;
