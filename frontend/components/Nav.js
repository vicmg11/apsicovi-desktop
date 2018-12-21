import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
	<NavStyles>
    <Link href="/">
			<a>Inicio</a>
		</Link>
    <Link href="/registro">
			<a>Registro</a>
		</Link>
		<Link href="/visitas">
			<a>Visitas</a>
		</Link>
    <Link href="/boletin">
			<a>Boletin</a>
		</Link>
    <Link href="/historial">
			<a>Historial</a>
		</Link>
	</NavStyles>
);

export default Nav;
