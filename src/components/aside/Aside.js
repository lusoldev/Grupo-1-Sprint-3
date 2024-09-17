'use client';

import Link from 'next/link';
import styles from './aside.module.css';
import { useRouter } from 'next/navigation';
import { useNavContext } from '@/hooks/useNavContext';

export const Aside = () => {
	const router = useRouter();
	console.log(router.pathname);
	const { setMenuMobileOpen } = useNavContext();
	const handleBack = () => {
		setMenuMobileOpen(false);
		router.back();
	};

	return (
		<aside className={styles.aside} id="aside">
			<ul>
				{router.pathname === '/cuentas' ? (
					<button
						onClick={() => {
							handleBack();
							setMenuMobileOpen(false);
						}}
						className={styles.registerButton}
						id="account-action">
						<span className="plus-sign">⬅</span> Volver
					</button>
				) : (
					<Link
						href="/cuentas"
						className={styles.registerButton}
						id="account-action"
						onClick={() => setMenuMobileOpen(false)}>
						Ingreso
					</Link>
				)}
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/">
						<span className="material-symbols-outlined icon"> home</span> Inicio{' '}
					</Link>
				</li>
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/transferencias">
						<span className="material-symbols-outlined icon">account_balance</span> Transferencias
					</Link>
				</li>
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/pagos">
						<span className="material-symbols-outlined icon">order_approve </span>Pagos de Facturas
					</Link>
				</li>
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/solicitar-prestamo">
						<span className="material-symbols-outlined icon">paid</span> Solicitar Préstamo{' '}
					</Link>
				</li>
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/prestamos">
						<span className="material-symbols-outlined icon">calculate</span> Simular Préstamo 
					</Link>
				</li>
				<li>
					<Link onClick={() => setMenuMobileOpen(false)} href="/conversor">
						<span className="material-symbols-outlined icon">currency_exchange</span> Conversor{' '}
					</Link>
				</li>
			</ul>
		</aside>
	);
};
