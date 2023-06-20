import React from 'react';



function SelectAnswer({ id, checkAnswer }) {

    return (
        <>
            <div
                onClick={() => checkAnswer(id+1, true)}
                className="btn-type to-left rounded btn-transparent text-white text-upper btn-small">
                <span>Это правда</span>
            </div>
            <div
                onClick={() => checkAnswer(id+1, false)}
                className="btn-type to-right rounded btn-transparent text-upper text-white btn-small">
                <span>Это миф</span>
            </div>
        </>
    )
}

export default SelectAnswer;