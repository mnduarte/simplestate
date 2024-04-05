import { Button, Upload } from "antd";
import { MdAttachFile } from "react-icons/md";

const { Dragger } = Upload;

type DetailsInvestmentProps = {
  bank: string;
  cuit: string;
  accountType: string;
  accountNumber: string;
  name: string;
  cbu: string;
  handleFileUpload: (info: any) => void;
  action: string;
  setOpenModal: (open: boolean) => void;
  currency: string;
  amount: number;
  isDisabled: boolean;
};

const DetailsInvestment: React.FC<DetailsInvestmentProps> = ({
  bank,
  cuit,
  accountType,
  accountNumber,
  name,
  cbu,
  handleFileUpload,
  action,
  setOpenModal,
  currency,
  amount,
  isDisabled,
}) => (
  <>
    <div className="card mb-20">
      <label className="title">Forma de pago: Transferencia bancaria</label>

      <label>
        Monto a pagar:
        <span>
          {currency} {amount}
        </span>
      </label>

      <div className="subtitle w-full mb-20 mt-20">
        Datos para transferencia
      </div>

      <label>
        Banco:
        <span>{bank}</span>
      </label>
      <label>
        CUIT:
        <span>{cuit}</span>
      </label>

      <label>
        Tipo de cuenta:
        <span>{accountType}</span>
      </label>

      <label>
        Numero de cuenta:
        <span>{accountNumber}</span>
      </label>

      <label>
        Razon social:
        <span>{name}</span>
      </label>

      <label>
        CBU:
        <span>{cbu}</span>
      </label>

      <div className="subtitle w-full mt-20">Adjuntar comprobante de pago</div>

      <Dragger
        name="file"
        className="dragger mb-40"
        action={action}
        onChange={handleFileUpload}
      >
        <MdAttachFile size={32} />
        <p className="ant-upload-hint">Arrastra la imagen o adjuntala aqui</p>
      </Dragger>
    </div>

    <div className="form-item-submit right">
      <Button
        className="form-button"
        disabled={isDisabled}
        onClick={() => setOpenModal(true)}
      >
        Finalizar
      </Button>
    </div>
  </>
);

export default DetailsInvestment;
