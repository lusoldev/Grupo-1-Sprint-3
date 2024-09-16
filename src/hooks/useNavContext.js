'use client';

import { useContext } from 'react';
import { NavContext } from '../context/NavContext';

export const useNavContext = () => {
	const context = useContext(NavContext);
	if (context === undefined) throw new Error('NavContext fue usado fuera del NavContext.Provider');
	return context;
};
