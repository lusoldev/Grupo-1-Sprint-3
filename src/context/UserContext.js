'use client';

import { createContext, useEffect, useState } from 'react';
import usuarioDemo from '../utils/usuarioDemo.json';

// Crear el contexto
export const UserContext = createContext();

// Hook para obtener el usuario actual
const useUsuarioActual = () => {
	const [usuarioActual, setUsuarioActual] = useState(null);

	useEffect(() => {
		const storedUsuario = localStorage.getItem('usuarioActual');
		if (!storedUsuario) {
			localStorage.setItem('usuarioActual', 'Demo');
			setUsuarioActual('Demo');
		} else {
			setUsuarioActual(storedUsuario);
		}
	}, []);

	return [usuarioActual, setUsuarioActual];
};

// Hook para obtener la lista de usuarios
const useUsuarios = () => {
	const [usuarios, setUsuarios] = useState(null);

	useEffect(() => {
		let storedUsuarios = localStorage.getItem('usuarios');
		if (!storedUsuarios) {
			storedUsuarios = {
				demo: usuarioDemo
			};
			localStorage.setItem('usuarios', JSON.stringify(storedUsuarios));
			setUsuarios(storedUsuarios);
		} else {
			setUsuarios(JSON.parse(storedUsuarios));
		}
	}, []);

	useEffect(() => {
		return () => {};
	}, [usuarios]);

	return [usuarios, setUsuarios];
};

// Proveedor de contexto
export const UserProvider = ({ children }) => {
	// Inicializar el estado directamente con los valores retornados por los hooks
	const [usuarioActual, setUsuarioActual] = useUsuarioActual();
	const [usuarios, setUsuarios] = useUsuarios();

	const updateUsuarios = (usuariosActualizado) => {
		if (!usuariosActualizado) return;
		localStorage.setItem('usuarios', JSON.stringify(usuariosActualizado));
		setUsuarios(usuariosActualizado);
	};
	const updateUsuarioActual = (usuario) => {
		if (!usuario) return;
		localStorage.setItem('usuarioActual', usuarioActual);
		setUsuarioActual(usuario);
	};
	return (
		<UserContext.Provider
			value={{
				usuarioActual,
				usuarios,
				updateUsuarios,
				updateUsuarioActual
			}}>
			{children}
		</UserContext.Provider>
	);
};
