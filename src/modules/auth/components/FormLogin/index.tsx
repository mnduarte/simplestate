import { Form, Input, Button } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormLoginProps {
  onLogin: (values: any) => void;
  loading: boolean;
  onFieldsChange: (changedFields: any, allFields: any) => void;
  isDisabled: boolean;
}

const FormLogin: React.FC<FormLoginProps> = ({
  onLogin,
  loading,
  onFieldsChange,
  isDisabled,
}) => (
  <Form name="login_form" onFinish={onLogin} onFieldsChange={onFieldsChange}>
    <label className="form-label">Correo electrónico</label>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "Por favor ingresa tu correo electrónico",
        },
      ]}
      className="form-item"
    >
      <Input />
    </Form.Item>

    <label className="form-label">Contraseña</label>
    <Form.Item
      name="password"
      rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
      className="form-item"
    >
      <Input.Password
        iconRender={(visible) =>
          visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
        }
      />
    </Form.Item>
    <a href="#" className="form-link">
      ¿Olvidaste la contraseña?
    </a>

    <Form.Item className="form-item centered">
      <Button
        type="primary"
        htmlType="submit"
        className="form-button"
        loading={loading}
        disabled={isDisabled}
      >
        Ingresar
      </Button>
    </Form.Item>

    <Form.Item className="form-item centered">
      <span className="form-text">¿Ya tienes cuenta?</span>
      <a href="#" className="form-link">
        Inicia Sesión
      </a>
    </Form.Item>
  </Form>
);

export default FormLogin;
