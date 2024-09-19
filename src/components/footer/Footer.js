'use client';

import Link from 'next/link';
import styles from './footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContenido}>
				<div className={styles.logo}>
					<div className={styles.imagenFooter}>
						<a href="index.html">
							<img src="/imagenes/banking-isologotipoai.png" alt="Banking Logo" />
						</a>
					</div>
					<div className={styles.copyRight}>
						<p>
							&copy; 2024 Banking Inc. Todos los <br />
							derechos reservados.
						</p>
					</div>
				</div>
				<div className={styles.enlaces}>
					<h2 className={styles.footerTitulo}>LEGAL</h2>
					<Link href={'/terminos-y-condiciones'}>Términos y condiciones</Link>
					<Link href={'/politica-de-privacidad'}>Política de privacidad</Link>
				</div>
				<div className={styles.enlaces}>
					<h2 className={styles.footerTitulo}>ENLACES</h2>
					<Link href={'/transferencias'}>Transferencias</Link>
					<Link href={'/pagos'}>Pagos de facturas</Link>
					<Link href={'/solicitar-prestamo'}>Solicitar prestamo</Link>
					<Link href={'/simular-prestamo'}>Simular prestamo</Link>
				</div>
				<div className={styles.redes}>
					<a href="https://www.facebook.com/" target="facebook">
						<img src="/iconos/icono-facebook.svg" alt="Ingresar a Facebook" />
					</a>
					<a href="https://github.com/lusoldev/Grupo-1-Sprint-3" target="github">
						<img src="/iconos/icono-github.svg" alt="Ingresar a GitHub" />
					</a>
					<a href="https://www.instagram.com/" target="instagram">
						<img src="/iconos/icono-instagram.svg" alt="Ingresar a Instagram" />
					</a>
				</div>
			</div>
		</footer>
	);
};
