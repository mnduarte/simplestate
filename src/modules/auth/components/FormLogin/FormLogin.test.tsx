import { render } from "@testing-library/react";
import FormLogin from "./";

describe("FormLogin Component", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <FormLogin
        onLogin={() => {}}
        loading={false}
        onFieldsChange={() => {}}
        isDisabled={false}
      />
    );

    expect(getByText("Correo electrónico")).toBeInTheDocument();
    expect(getByText("Contraseña")).toBeInTheDocument();
    expect(getByText("Ingresar")).toBeInTheDocument();
    expect(getByText("¿Ya tienes cuenta?")).toBeInTheDocument();
  });
});
