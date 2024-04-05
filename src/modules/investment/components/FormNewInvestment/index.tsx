import { FC } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

type FormNewInvestmentProps = {
  onFinish: any;
  models: { id: number; model: string }[];
  currencies: { id: number; currency: string }[];
  showDetails: boolean;
  details: JSX.Element | null;
  loading: boolean;
};

const FormNewInvestment: FC<FormNewInvestmentProps> = ({
  onFinish,
  models,
  currencies,
  showDetails,
  details,
  loading,
}) => (
  <Form name="new_investment_form" onFinish={onFinish}>
    <div className="card mb-20">
      <section>
        <label className="form-label">Tipo de inversión*</label>
        <Form.Item
          name="modelId"
          className="mb-0"
          rules={[
            {
              required: true,
              message: "Por favor selecciona el tipo de inversión",
            },
          ]}
        >
          <Select>
            {models.map(({ id, model }: any) => (
              <Option value={id} key={id}>
                {model}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <a href="#" className="form-link">
          Ver más sobre tipos de inversión
        </a>
      </section>

      <section>
        <label className="form-label">Moneda*</label>
        <Form.Item
          name="currencyId"
          rules={[
            { required: true, message: "Por favor selecciona la moneda" },
          ]}
        >
          <Select>
            {currencies.map(({ id, currency }: any) => (
              <Option value={id} key={id}>
                {currency}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </section>

      <section>
        <label className="form-label">Monto a invertir*</label>
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el monto a invertir",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </section>
    </div>

    {Boolean(showDetails) && details}

    <Form.Item className="form-item-submit right">
      <Button className="form-button" htmlType="submit" loading={loading}>
        Continuar
      </Button>
    </Form.Item>
  </Form>
);

export default FormNewInvestment;
