import { UserProvider } from '@/context/UserContext';
import './globals.css';
import 'material-symbols';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { Aside, Footer, Header } from '@/components';
import { NavProvider } from '@/context/NavContext';

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '600', '800']
});

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<UserProvider>
				<NavProvider>
					<body className={plusJakartaSans.className}>
						<Header />
						<Aside />
						<main className="main-content" id="main-content">
							{children}
						</main>
						<Footer />
					</body>
				</NavProvider>
			</UserProvider>
		</html>
	);
}
