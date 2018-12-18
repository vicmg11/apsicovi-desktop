import Link from 'next/link';

const Nav = () => (
	<div>
    <Link href="/">
			<a>Home!</a>
		</Link>
    <Link href="/registro">
			<a>Registro!</a>
		</Link>
		<Link href="/visitas">
			<a>Visitas!</a>
		</Link>
    <Link href="/boletin">
			<a>Boletin!</a>
		</Link>
    <Link href="/historial">
			<a>Historial!</a>
		</Link>
	</div>
);

export default Nav;
