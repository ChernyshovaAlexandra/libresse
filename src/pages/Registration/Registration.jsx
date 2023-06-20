import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegistrationResult from "./components/RegistrationResult";
import RegistrationWaiting from "./components/RegistrationWaiting";
import RegistrationModal from "./components/RegistrationModal";
import InputHandle from "./components/InputHandle";
import Scaner from "./components/Scaner";
import API from "../../utils/API";
import addCheck from "../../assets/images/addCheck.png";

function Registration(props) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [sum, setSum] = useState("");
    const [fn, setFn] = useState("");
    const [fd, setFd] = useState("");
    const [fp, setFp] = useState("");
    const [modal, showModal] = useState(false);
    const [appliedCheck, applyCheck] = useState(undefined);
    const [inputHandle, setHandleInput] = useState(false);
    const [scaner, setScaner] = useState(false);
    const [file, setFile] = useState(null)
    
    let vk_id = props.state.user ? props.state.user.id : 123;
    let wh = window.innerWidth
    const changeDate = (e) => {
        setDate(e.target.value);
    };
    const changeTime = (e) => setTime(e.target.value);
    const changeSum = (e) => setSum(e.target.value);
    const changeFn = (e) => setFn(e.target.value);
    const changeFd = (e) => setFd(e.target.value);
    const changeFp = (e) => setFp(e.target.value);
    const sendCheck = (e) => {
        e.preventDefault();
        if (date && time && sum && fn && fd && fp) {
            //
            // TODO form send
            //
            showModal(true);
            detectCheckAfterLoading();
        }
    };
    const clearForm = () => {
        setDate("");
        setTime("");
        setSum("");
        setFn("");
        setFd("");
        setFp("");
        setFile(null)
    };

 
    const loadFile = () => {
        let formData = new FormData();
        let fileCur = document.getElementById('photo').files[0]
        formData.append('file', fileCur);


        API.post('/api/check/photo', {formData, vk_id: vk_id}, {
            headers: {
                'Content-Type': file.type
            }
        })
    }
    const detectCheckAfterLoading = (check_id) => {
        setTimeout(() => {
            applyCheck('pending')
            clearInterval(interval);
        }, 20000)

        let interval;
        if (appliedCheck === undefined) {
            interval = setInterval(() => {
                API.get(`/api/checks/status/${check_id}`, { params: { vk_id: vk_id } })
                    .then(res => {
                        if (res.data.status === 'REVIEWED') {
                            applyCheck(res.data.result);
                            
                            clearInterval(interval);
                        }
                        res.data.data && props.setCoins(res.data.data)
                    }
                    ).catch((error) => {
                        applyCheck(false)
                        clearInterval(interval);
                    })
            }, 5000)
        } else {
            clearInterval(interval);
        }

    };
    const tryAgain = () => {
        applyCheck(undefined);
        showModal(false);
        clearForm();
    };


    const pushCheck = (e) => {
        setFile(e.target.files[0])
    }
    const loadCheck = () => {
        var formData = new FormData();
        formData.append("file", file);
        formData.append('vk_id', vk_id)
        API.post('/api/checks/photo',
            formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(
                res => {
                    if (res.data.success && res.data.checkId) {
                        showModal(true)
                        detectCheckAfterLoading(res.data.checkId)
                    }
                    else {
                        showModal(true)
                        applyCheck(false)
                    }
                }
            )
            .catch(() => {
                showModal(true)
                applyCheck(false)
            })
    }

    return (
        <div className="registration-content fixedBg bg-white">
            {modal ? (
                <div className="content registration">
                    <Link
                        className={`btn btn-type close-btn rounded pink`}
                        to="/"
                        replace
                    />
                    {appliedCheck === undefined ?
                        <RegistrationWaiting />
                        :
                        <RegistrationResult
                            appliedCheck={appliedCheck}
                            tryAgain={tryAgain}
                        />
                    }
                </div>
            ) : inputHandle ? (
                <InputHandle
                    sendCheck={sendCheck}
                    changeDate={changeDate}
                    changeTime={changeTime}
                    changeSum={changeSum}
                    changeFn={changeFn}
                    changeFp={changeFp}
                    changeFd={changeFd}
                    applyCheck={detectCheckAfterLoading}
                    date={date}
                    time={time}
                    sum={sum}
                    fn={fn}
                    fd={fd}
                    fp={fp}
                    vk_id={vk_id}
                />
            ) : scaner ? (
                <Scaner applyCheck={detectCheckAfterLoading} vk_id={vk_id} appliedCheck={appliedCheck} />
            ) : (
                <div className="content registration">
                    <Link
                        to="/"
                        replace
                        className={`btn btn-type close-btn rounded pink`}
                    />
                    <RegistrationModal
                        header={wh < 700 ? "Чтобы зарегистрировать чек, отсканируйте его" : "Загрузите фото чека"}
                        inner={
                            <>
                                {file ? <></> : <p className="modellica text-gray mg-tp-2 text-centred max-width-80 centred">
                                    Фото должно быть четким, весь текст должен быть читабельным,
                                    чек должен полностью помещаться на экране
                                </p>}
                                {wh < 700 ?
                                <>
                                    <button
                                        onClick={setScaner}
                                        className="btn-type btn-wide rounded pink-btn text-white mg-tp-2"
                                    >
                                        <span> Сканировать чек</span>
                                    </button> 
                                    <label className="btn-type btn-wide rounded pink-btn text-white mg-tp-1" htmlFor="file" onChange={pushCheck}>
                                            <svg
                                                viewBox="0 0 21 33"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.5 10.365V22.5001C1.5 24.8871 2.44822 27.1763 4.13605 28.8641C5.82389 30.5519 8.11309 31.5002 10.5 31.5002C12.887 31.5002 15.1762 30.5519 16.864 28.8641C18.5519 27.1763 19.5001 24.8871 19.5001 22.5001V7.50003C19.5001 5.90873 18.868 4.38259 17.7427 3.25737C16.6175 2.13214 15.0914 1.5 13.5001 1.5C11.9088 1.5 10.3826 2.13214 9.2574 3.25737C8.13218 4.38259 7.50003 5.90873 7.50003 7.50003V21.2731C7.50003 21.6671 7.57763 22.0572 7.72839 22.4212C7.87916 22.7851 8.10014 23.1159 8.37872 23.3944C8.65729 23.673 8.98801 23.894 9.35199 24.0448C9.71597 24.1955 10.1061 24.2731 10.5 24.2731V24.2731C11.2957 24.2731 12.0588 23.9571 12.6214 23.3944C13.184 22.8318 13.5001 22.0688 13.5001 21.2731V10.5"
                                                    stroke="white"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <input type="file" name="file" id="file" />
                                            <span>Добавить фото чека</span>
                                        </label>
                                        <div className="grid grid-col-2">
                                            <p className='text text-small modellica text-centred' >{file ? file.name : ''}</p>
                                            {file && <button className="btn-type btn-wide rounded pink-btn text-white mg-tp-1" onClick={loadCheck}>Загрузить</button>}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <label className="btn-type btn-wide rounded pink-btn text-white mg-tp-1" htmlFor="file" onChange={pushCheck}>
                                            <svg
                                                viewBox="0 0 21 33"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.5 10.365V22.5001C1.5 24.8871 2.44822 27.1763 4.13605 28.8641C5.82389 30.5519 8.11309 31.5002 10.5 31.5002C12.887 31.5002 15.1762 30.5519 16.864 28.8641C18.5519 27.1763 19.5001 24.8871 19.5001 22.5001V7.50003C19.5001 5.90873 18.868 4.38259 17.7427 3.25737C16.6175 2.13214 15.0914 1.5 13.5001 1.5C11.9088 1.5 10.3826 2.13214 9.2574 3.25737C8.13218 4.38259 7.50003 5.90873 7.50003 7.50003V21.2731C7.50003 21.6671 7.57763 22.0572 7.72839 22.4212C7.87916 22.7851 8.10014 23.1159 8.37872 23.3944C8.65729 23.673 8.98801 23.894 9.35199 24.0448C9.71597 24.1955 10.1061 24.2731 10.5 24.2731V24.2731C11.2957 24.2731 12.0588 23.9571 12.6214 23.3944C13.184 22.8318 13.5001 22.0688 13.5001 21.2731V10.5"
                                                    stroke="white"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <input type="file" name="file" id="file" />
                                            <span>Добавить фото чека</span>
                                        </label>
                                        <div className="grid grid-col-2">
                                            <p className='text text-small modellica text-centred' >{file ? file.name : ''}</p>
                                            {file && <button className="btn-type btn-wide rounded pink-btn text-white mg-tp-1" onClick={loadCheck}>Загрузить</button>}
                                        </div>
                                    </>
                                }
                                {/* <button
                                    onClick={() => setHandleInput(true)}
                                    className="btn-type text-pink btn-small text-upper text-bold"
                                >
                                    Или введите вручную
                                </button> */}
                            </>
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default Registration;
