'use client';

import { createContext, useState } from 'react';

// Crear el contexto
export const NavContext = createContext();

// Proveedor de contexto
export const NavProvider = ({ children }) => {
	// Inicializar el estado directamente con los valores retornados por los hooks
	const [menuMobileOpen, setMenuMobileOpen] = useState(false);
	return (
		<NavContext.Provider
			value={{
				menuMobileOpen,
				setMenuMobileOpen
			}}>
			{children}
		</NavContext.Provider>
	);
};
