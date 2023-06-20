import QrReader from "react-qr-reader";
import React from "react";
import {useState} from "react";
import RegistrationWaiting from "./RegistrationWaiting";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import API from "../../../utils/API";
import RegistrationResult from "./RegistrationResult";

function Scaner({applyCheck, vk_id, appliedCheck}) {
    const [scanData, setScanData] = useState(null);
    const [check_id, setCheckId] = useState(null);
    const handleError = () => {
    };
    const scan = (data) => {
        if (!scanData) {
            setScanData(data);
            data && checkCheck(data);
        }
    };

    const checkCheck = (data) => {
        return API.post(`/api/checks/qrstring`, {
            vk_id: vk_id,
            qrstring: data,
        })
            .then((res) => {
                if (res.data.success) {
                    setCheckId(res.data.checkId);
                    applyCheck(res.data.checkId)
                } else {
                    applyCheck(false);
                }
            })
            .catch((error) => {
                setTimeout(() => {
                }, 800);
            });
    };

    return (
        <>
            {scanData ? (
                <div className="content registration">
                    <Link
                        className={`btn btn-type close-btn rounded pink`}
                        to="/"
                        replace
                    />
                    {appliedCheck ? <RegistrationResult appliedCheck={appliedCheck}/> : <RegistrationWaiting/>}
                </div>
            ) : (
                <>
                    <QrReader delay={300} onError={handleError} onScan={scan}/>
                    <p className="instruction modellica centred text-bold text-white ">
                        Для сканирования
                        <br/>
                        поместите штрихкод в рамку
                    </p>
                </>
            )}
        </>
    );
}

export default Scaner;
