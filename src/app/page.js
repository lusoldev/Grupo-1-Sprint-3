import { Home } from '@/sections';
import { Metadata } from 'next';
export const metadata = {
	title: 'Home Banking todo en uno - Banking',
	description:
		'Somos tu Homebaking de confianza, desde nuestra aplicación vas a poder llevar un seguimiento avanzado de tu dinero, realizar transferencias, pagos y solicitudes de préstamos. Esto entre muchas otras funcionalidades más.'
};

export default function HomePage() {
	return <Home />;
}
