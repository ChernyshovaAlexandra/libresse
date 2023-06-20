import React from 'react';
import Loader from '../../components/Loader';
import RegistrationModal from './RegistrationModal';


function RegistrationWaiting() {
    return (
        <RegistrationModal
            header='Загрузка чека'
            inner={
                <>
                    <div className="loader centred mg-tp-2">
                        <Loader />
                    </div>
                    <p className='text-centred mg-tp-2 modellica text-gray max-width-80 centred'>
                        Обычно проверка чека занимает не более 1 минуты,
                        в&#160;редких случаях это занимает больше времени.
                        Мы&#160;пришлем вам уведомление после проверки чека</p>
                </>
            } />
    )
}

export default RegistrationWaiting;