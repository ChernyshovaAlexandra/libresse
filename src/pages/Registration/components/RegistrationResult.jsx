import React from 'react';
import {Link} from 'react-router-dom';
import RegistrationModal from './RegistrationModal';


function RegistrationResult({appliedCheck, tryAgain}) {
    return (
        <RegistrationModal
            header={appliedCheck === true ? `Чек успешно зарегистрирован!` : appliedCheck === 'pending' ? `Чек проходит проверку` : `К сожалению, чек не найден`}
            inner={
                <>
                    <p className='text-centred mg-tp-1 modellica text-gray max-width-80 centred'>
                        {appliedCheck === true ? `На ваш счет начислено 3 балла` :
                            appliedCheck === 'pending' ?
                                ` Обычно проверка чека занимает не более 1 минуты,
                           в редких случаях это занимает больше времени.
                           Мы пришлем вам уведомление после проверки чека` : 'Чек не принят'}</p>
                    {appliedCheck ?
                        <Link to='/game'
                              className='input-full-width btn btn-type centred pink-btn rounded text-white mg-tp-2'>Супер!
                            Вперед играть!</Link>
                        : <button onClick={tryAgain}
                                  className='input-full-width btn btn-type centred pink-btn text-white mg-tp-2 rounded'>Попробовать
                            еще раз</button>}</>
            }
        />
    )
}

export default RegistrationResult;