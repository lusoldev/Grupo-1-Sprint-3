"use client";

import { useState } from 'react';
import './contacto.css';

export const Contacto = () => {
    const [dataFormulario, setDataFormulario] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataFormulario({
            ...dataFormulario,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataFormulario);
    };

    return (
        <div className="contactoFormContainer">
            <h1>Contáctanos</h1>
            <form onSubmit={handleSubmit}>
                <div className="contactoFormGroup">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        value={dataFormulario.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre"
                        required
                    />
                </div>
                <div className="contactoFormGroup">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={dataFormulario.email}
                        onChange={handleChange}
                        placeholder="Ingrese su email"
                        required
                    />
                </div>
                <div className="contactoFormGroup">
                    <label htmlFor="asunto">Asunto</label>
                    <select 
                        id="asunto"
                        name="asunto"
                        value={dataFormulario.asunto}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un asunto</option>
                        <option value="problemasCuenta">Problemas con la cuenta</option>
                        <option value="problemasTransferencias">Problemas con las transferencias</option>
                        <option value="problemasPagos">Problemas con los pagos</option>
                        <option value="problemasPrestamos">Problemas con los prestamos</option>
                        <option value="solicitarSoporte">Solicitar contacto</option>
                    </select>
                </div>
                <div className="contactoFormGroup">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea 
                        id="mensaje"
                        name="mensaje"
                        value={dataFormulario.mensaje}
                        onChange={handleChange}
                        placeholder="Ingrese su mensaje"
                        required
                    ></textarea>
                </div>
                <div className="contactoFormGroup">
                    <button type="submit">Enviar Formulario</button>
                </div>
            </form>
        </div>
    );
};
