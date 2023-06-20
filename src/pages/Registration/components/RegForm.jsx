import React from "react";
import TextField from "@material-ui/core/TextField";
import MaterialInput from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

function RegForm({
  changeDate,
  changeTime,
  changeSum,
  changeFn,
  changeFp,
  changeFd,
  applyCheck,
  date,
  time,
  sum,
  fn,
  fd,
  fp,
}) {
  const sendData = (e) => {
    e.preventDefault();
    let newDate = date.split(".").reverse().join('') + 'T' + time.replaceAll(":", "");

    let qstring =
      "t=" +
      newDate +
      "&s=" +
      sum +
      "&fn=" +
      fn +
      "&i=" +
      fd +
      "&fp=" +
      fp +
      "&i=1";
    applyCheck(qstring);
    // qrstring: "t=20210829T1235&s=365.79&fn=9960440300464953&i=5071&fp=3902039337&n=1"
  };
  return (
    <form
      className="reistration__form max-width-80 centred mg-tp-1"
      onSubmit={(e) => sendData(e)}
    >
      <InputMask mask="99.99.9999" onChange={changeDate} className="modellica">
        {(inputProps) => (
          <MaterialInput
            {...inputProps}
            type="tel"
            disableUnderline
            required
            placeholder="дд/мм/гггг"
          />
        )}
      </InputMask>

      <InputMask mask="99:99" onChange={changeTime} className="modellica">
        {(inputProps) => (
          <MaterialInput
            {...inputProps}
            required
            type="tel"
            disableUnderline
            placeholder="00:00"
          />
        )}
      </InputMask>
      <TextField
        label="Сумма чека"
        placeholder="с копейками"
        className="input-full-width"
        onChange={changeSum}
        required
      />
      <TextField
        label="ФН"
        placeholder="16 цифр, в начале или конце чека"
        className="input-full-width"
        onChange={changeFn}
        required
      />
      <TextField
        label="ФД"
        placeholder="1-10 цифр в конце чека"
        className="input-full-width"
        onChange={changeFd}
        required
      />
      <TextField
        label="ФП или ФПД"
        placeholder="8-10 цифр в конце чека"
        className="input-full-width"
        onChange={changeFp}
        required
      />
      <button
        type="submit"
        className="input-full-width btn btn-type centred rounded pink-btn text-white mg-tp-1"
      >
        Зарегистрировать
      </button>
      {/* <div className="addPhoto btn"></div> */}
    </form>
  );
}

export default RegForm;
