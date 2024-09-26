'use client';

import { useEffect, useState } from 'react';
import styles from './tarjetas.module.css';
import { Exito, Error as ErrorComponent } from '@/components/feedback';

const Tarjetas = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [nuevoNumero, setNuevoNumero] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevoCVC, setNuevoCVC] = useState('');
  const [nuevaExpiracion, setNuevaExpiracion] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarjetaEditando, setTarjetaEditando] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const fetchTarjetas = async () => {
      const response = await fetch('/tarjetas.json');
      if (!response.ok) {
        throw new Error('Error al cargar el archivo json');
      }
      const data = await response.json();
      return data.tarjetas;
    };

    const cargarTarjetas = () => {
      const tarjetasGuardadas = localStorage.getItem('tarjetas');
      if (tarjetasGuardadas) {
        setTarjetas(JSON.parse(tarjetasGuardadas));
      } else {
        fetchTarjetas()
          .then((tarjetasPorDefecto) => {
            setTarjetas(tarjetasPorDefecto);
            localStorage.setItem('tarjetas', JSON.stringify(tarjetasPorDefecto));
          })
          .catch((error) => console.error(error));
      }
    };

    cargarTarjetas();
  }, []);

  useEffect(() => {
    if (mensajeExito || mensajeError) {
      const timer = setTimeout(() => {
        setMensajeExito('');
        setMensajeError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mensajeExito, mensajeError]);

  const agregarTarjeta = (e) => {
    e.preventDefault();
    setMensajeError('');
    setMensajeExito('');

    if (!validarNumeroTarjeta(nuevoNumero)) {
      setMensajeError('Ingresá los 16 dígitos de la tarjeta.');
      return;
    }

    if (!validarExpiracion(nuevaExpiracion)) {
      setMensajeError('El MES no puede ser mayor a 12 y el año debe ser mayor a 24.');
      return;
    }

    const nuevaTarjeta = {
      numero: nuevoNumero,
      tipo: nuevoTipo,
      cvc: nuevoCVC,
      expiracion: nuevaExpiracion,
    };

    if (tarjetaEditando) {
      const tarjetasActualizadas = tarjetas.map((tarjeta) =>
        tarjeta === tarjetaEditando ? nuevaTarjeta : tarjeta
      );
      setTarjetas(tarjetasActualizadas);
      localStorage.setItem('tarjetas', JSON.stringify(tarjetasActualizadas));
      setTarjetaEditando(null);
      setMensajeExito('Tarjeta actualizada exitosamente.');
    } else {
      const nuevasTarjetas = [...tarjetas, nuevaTarjeta];
      setTarjetas(nuevasTarjetas);
      localStorage.setItem('tarjetas', JSON.stringify(nuevasTarjetas));
      setMensajeExito('Tarjeta agregada exitosamente.');
    }

    resetearFormulario();
  };

  const eliminarTarjeta = (tarjetaAEliminar) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta tarjeta?');
    if (confirmacion) {
      const tarjetasActualizadas = tarjetas.filter((tarjeta) => tarjeta !== tarjetaAEliminar);
      setTarjetas(tarjetasActualizadas);
      localStorage.setItem('tarjetas', JSON.stringify(tarjetasActualizadas));
      setMensajeError('¡Tarjeta eliminada!');
    }
  };

  const editarTarjeta = (tarjetaAEditar) => {
    setNuevoNumero(tarjetaAEditar.numero);
    setNuevoTipo(tarjetaAEditar.tipo);
    setNuevoCVC(tarjetaAEditar.cvc);
    setNuevaExpiracion(tarjetaAEditar.expiracion);
    setTarjetaEditando(tarjetaAEditar);
    setMostrarFormulario(true);
  };

  const validarNumeroTarjeta = (numero) => {
    const soloNumeros = /^[0-9\s]+$/.test(numero);
    const sinEspaciosExtra = numero.replace(/\s/g, '').length === 16;
    return soloNumeros && sinEspaciosExtra;
  };

  const validarExpiracion = (expiracion) => {
    const [mes, año] = expiracion.split('/');
    const mesValido = mes >= 1 && mes <= 12;
    const añoValido = año >= 24;
    return mesValido && añoValido && expiracion.length === 5;
  };

  const formatearNumeroTarjeta = (valor) => {
    const soloNumeros = valor.replace(/\D/g, '');
    const formateado = soloNumeros.replace(/(.{4})/g, '$1 ').trim();
    setNuevoNumero(formateado);
  };

  const formatearExpiracion = (valor) => {
    const soloNumeros = valor.replace(/\D/g, '');
    let formateado = soloNumeros;
    if (soloNumeros.length >= 2) {
      formateado = soloNumeros.slice(0, 2) + '/' + soloNumeros.slice(2, 4);
    }
    setNuevaExpiracion(formateado);
  };

  const censurarNumeroTarjeta = (numero) => {
    const ultimosCuatro = numero.slice(-4);
    return '**** **** **** ' + ultimosCuatro;
  };

  const resetearFormulario = () => {
    setNuevoNumero('');
    setNuevoCVC('');
    setNuevaExpiracion('');
    setNuevoTipo('');
    setMostrarFormulario(false);
    setTarjetaEditando(null);
  };

  return (
    <section className={styles.sectionTarjetas}>
      <h2 className={styles.tarjetasGuardadas}>Tarjetas Guardadas</h2>
      <ul className={styles.classContainer}>
        {tarjetas.map((tarjeta, index) => (
          <li key={index} className={styles.tarjeta}>
            <h3>Tarjeta de {tarjeta.tipo.charAt(0).toUpperCase() + tarjeta.tipo.slice(1)}</h3>
            <div className={styles.numero}>{censurarNumeroTarjeta(tarjeta.numero)}</div>
            <div className={styles.expiracion}>Exp: {tarjeta.expiracion}</div>
            <div className={styles.botones}>
              <button id={styles.editar} onClick={() => editarTarjeta(tarjeta)}><span class="material-symbols-outlined icon">edit</span>Editar</button>
              <button id={styles.eliminar} onClick={() => eliminarTarjeta(tarjeta)}><span class="material-symbols-outlined icon">delete</span>ELIMINAR</button>
            </div>
          </li>
        ))}
      </ul>
      {mensajeExito && <Exito message={mensajeExito} />}
      {mensajeError && <ErrorComponent message={mensajeError} />}
      {mostrarFormulario && (
        <form onSubmit={agregarTarjeta}>
          <br />
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={nuevoNumero}
            onChange={(e) => formatearNumeroTarjeta(e.target.value)}
            required
            maxLength={19}
            style={{ appearance: 'none' }}
          />
          <br />
          <select value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)} required>
            <option value="">Tipo</option>
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="CVC"
            value={nuevoCVC}
            onChange={(e) => setNuevoCVC(e.target.value)}
            required
            maxLength={3}
          />
          <br />
          <input
            type="text"
            placeholder="Expiración (MM/AA)"
            value={nuevaExpiracion}
            onChange={(e) => formatearExpiracion(e.target.value)}
            required
            maxLength={5}
          />
          <br />
          <button type="submit">{tarjetaEditando ? 'Actualizar' : 'Agregar'}</button>
          <br />
        </form>
      )}
      <button
        onClick={() => {
          resetearFormulario();
          if (mostrarFormulario) {
            setMensajeError('Se canceló la operación.');
          }
          setMostrarFormulario(!mostrarFormulario);
        }}
      >
        {mostrarFormulario ? 'Cancelar' : 'Agregar Tarjeta'}
      </button>
    </section>
  );
};

export default Tarjetas;
