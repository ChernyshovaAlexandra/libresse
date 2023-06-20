import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../utils/API";
import RegForm from "./RegForm";

function InputHandle({
  changeDate,
  changeTime,
  changeSum,
  changeFn,
  changeFp,
  changeFd,
  applyCheck,
  vk_id,
  date,
  time,
  fn,
  fp,
  fd,
  sum,
}) {
  const [scanData, setScanData] = useState(null);
  const [check_id, setCheckId] = useState(null);
  
  const checkCheck = (data) => {
    return API.post(`/api/checks/form`, {
      vk_id: vk_id,
      qrstring: data,
    })
      .then((res) => {
        if (res.data.success) {
          setCheckId(res.data.checkId);
          applyCheck(res.data.checkId);
        } else {
          applyCheck(false);
        }
      })
      .catch((error) => {
        setTimeout(() => {}, 800);
      });
  };
  return (
    <div className="content bg-gray">
      <Link
        className={`btn btn-type close-btn rounded pink`}
        to="/"
        replace
      />
      <div className="inner">
        <h2 className="text-centred mg-tp-3">Зарегистрировать чек</h2>
        <p className="text-centred mg-tp-1 modellica text-gray">
          При регистрации чека вы получите 3 балла
        </p>
        <RegForm
          applyCheck={checkCheck}
          changeDate={changeDate}
          changeTime={changeTime}
          changeSum={changeSum}
          changeFn={changeFn}
          changeFp={changeFp}
          changeFd={changeFd}
          date={date}
          time={time}
          sum={sum}
          fn={fn}
          fd={fd}
          fp={fp}
        />
      </div>
    </div>
  );
}

export default InputHandle;
