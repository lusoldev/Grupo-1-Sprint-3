'use client';

import { useEffect } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { useNavContext } from '../../hooks/useNavContext';

import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
	// Consumir el valor del contexto
	const { usuarioActual } = useUserContext();
	const { menuMobileOpen, setMenuMobileOpen } = useNavContext();
	useEffect(() => {
		// Selecciona el botón del menú móvil y el panel lateral
		const asideEl = document.querySelector('#aside');
		asideEl.classList.toggle('visible'); // Alterna la visibilidad del panel lateral
	}, [menuMobileOpen]);

	return (
		<header className={styles.header}>
			<Link href="/" aria-label="Volver al inicio">
				<Image src="/imagenes/banking-logo.png" alt="Banking Logo" width={150} height={100}/>
			</Link>
			<div className={styles.navigation}>
				<div className={styles.searchBar}>
					<input type="text" placeholder="Buscar" aria-label="Buscar" />
					<button className={styles.searchButton} aria-label="Buscar">
						<span className="material-symbols-outlined">search</span>
					</button>
				</div>
				<div className={styles.headerIcons}>
					<Link href={'/contacto'} aria-label="Página de contacto">
						<div className="material-symbols-outlined">help</div>
					</Link>
					<Link href={'/cuentas'} aria-label="Perfil de usuario" className={styles.userProfile}>
						<div className={`material-symbols-outlined ${styles.userImage}`}>account_circle</div>
						<div className={styles.userOptions}>
							<span>{usuarioActual ?? 'Usuario Nuevo'}</span>
							<div className={`material-symbols-outlined ${styles.expand}`}>expand_more</div>
						</div>
					</Link>
				</div>
				<div className={styles.navMobile}>
					<button
						onClick={() => setMenuMobileOpen(() => !menuMobileOpen)}
						className={`${styles.navMobileButton} ${menuMobileOpen ? ' open' : ''}`}>
						<span className={`material-symbols-outlined ${styles.openIcon}`}>menu</span>
						<span className={`material-symbols-outlined ${styles.closeIcon}`}>close</span>
					</button>
				</div>
			</div>
		</header>
	);
};
