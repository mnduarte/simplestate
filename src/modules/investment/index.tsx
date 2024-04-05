import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import {
  investmentActions,
  useInvestment,
} from "../../contexts/InvestmentContext";
import FormNewInvestment from "./components/FormNewInvestment";
import DetailSimulated from "./components/DetailSimulated";
import DetailInvestment from "./components/DetailInvestment";
import useNotification from "../../hooks/useNotification";
import { ReactComponent as CongratulationIcon } from "../../assets/congratulations.svg";
import "./styles.css";

const URL_ACTION_UPLOAD_FILE =
  "https://02ede33a-b196-40a7-87ea-40cc76ac4399.mock.pstmn.io/test/storeInvestment";

const Investment = () => {
  const {
    state: { loading, currencies, models, simulateData, payment },
    dispatch,
  } = useInvestment();
  const [openModal, setOpenModal] = useState(false);
  const isFirstRender = useRef(true);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(investmentActions.getModels()(dispatch));
      dispatch(investmentActions.getCurrencies()(dispatch));
    }
  }, []);

  const onFinish = ({ modelId, currencyId, amount }: any) => {
    if (simulateData.totalReceived) {
      return dispatch(investmentActions.getPayment()(dispatch));
    }

    dispatch(
      investmentActions.simulateInvestment({ modelId, currencyId, amount })(
        dispatch
      )
    );
  };

  const handleFileUpload = (info: any) => {
    const { status } = info.file as { status: "done" | "error" | "uploading" };

    if (status === "done") {
      return openNotificationWithIcon(
        "success",
        "archivo cargado correctamente"
      );
    }

    if (status === "error") {
      return openNotificationWithIcon("error", "error al cargar el archivo");
    }

    setIsDisabled(!Boolean(info.fileList.length));
  };

  return (
    <div className="container-new-investment">
      {contextHolder}

      <a
        href="#"
        className="form-link"
        onClick={() => dispatch(investmentActions.removePayment()(dispatch))}
      >
        &lt; Volver
      </a>

      <p className="new-investment-title">Nueva Inversión</p>

      {!Boolean(payment.name) && (
        <FormNewInvestment
          onFinish={onFinish}
          loading={loading}
          models={models}
          currencies={currencies}
          showDetails={Boolean(simulateData.totalReceived)}
          details={<DetailSimulated {...simulateData} />}
        />
      )}

      {Boolean(payment.name) && (
        <DetailInvestment
          bank={payment.bank}
          cuit={payment.cuit}
          accountType={payment.account_type}
          accountNumber={payment.account_number}
          name={payment.name}
          cbu={payment.cbu}
          amount={simulateData.amount}
          currency={simulateData.currency}
          action={URL_ACTION_UPLOAD_FILE}
          isDisabled={isDisabled}
          handleFileUpload={handleFileUpload}
          setOpenModal={setOpenModal}
        />
      )}

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div className="centered">
          <CongratulationIcon />

          <div className="subtitle w-full mb-20 mt-20 centered">
            Ya registramos tu inversión
          </div>
          <p className="centered">
            Nuestro equipo estará validando el pago. En unos minutos, podrás ver
            el estado de la inversión en tus movimientos.{" "}
          </p>

          <div>
            <Button
              className="form-button-transparent mr-5"
              onClick={() => setOpenModal(false)}
            >
              Salir
            </Button>
            <Button className="form-button" onClick={() => setOpenModal(false)}>
              Ver movimiento
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Investment;
