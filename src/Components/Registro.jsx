import React from 'react'
import UserForm from './UserForm'


const Children = () => {
    return <UserForm />;
};


export const Registro = () => {
    return (
        <div className="registro">
          
           <div className=' formulario'> <Children />{UserForm}</div>
        </div>
    )
}

export default Registro;