import React from 'react';


function BurgerForm(props) {
    return <div className="panel">
        <p className="total">Итого: {props.total}</p>
        <div>
            {props.children}
        </div>
    </div>
}


export default BurgerForm
