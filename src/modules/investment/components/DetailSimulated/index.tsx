import Divider from "../../../../components/Divider";

type DetailSimulatedProps = {
  currency: string;
  amount: number;
  profitability_amount: number;
  model: string;
  profitability: number;
  mont_term: number;
  parking: string;
  totalReceived: number;
  payment: string;
};

const DetailSimulated: React.FC<DetailSimulatedProps> = ({
  currency,
  amount,
  profitability_amount,
  model,
  profitability,
  mont_term,
  parking,
  totalReceived,
  payment,
}) => (
  <div className="card mb-20">
    <label>
      Total de la inversión:
      <span>
        {currency} {amount}
      </span>
    </label>

    <label>
      Ganancia anual estimada:
      <span>
        {currency} {profitability_amount}
      </span>
    </label>

    <Divider />

    <label>
      Tipo de Inversión:
      <span>{model}</span>
    </label>

    <label>
      Tasa anual:
      <span>{profitability}%</span>
    </label>

    <label>
      Tiempo de inversión:
      <span>{mont_term} meses</span>
    </label>

    <label>
      Puedes retirarte:
      <span>{parking}</span>
    </label>

    <label>
      Recibirás al final del plazo:
      <span>
        {currency} {totalReceived}
      </span>
    </label>

    <label>
      Cuando cobras las ganancias:
      <span>{payment}</span>
    </label>
  </div>
);

export default DetailSimulated;
