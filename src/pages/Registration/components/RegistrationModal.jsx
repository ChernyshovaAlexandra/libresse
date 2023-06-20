import React from 'react';
import { Link } from 'react-router-dom';




function RegistrationModal({ header, inner }) {
    return (
        <div className="bottom">
            {header && <h2 className='text-centred mg-tp-2'>{header}</h2>}
            {inner && inner}
        </div>
    )
}

export default RegistrationModal;