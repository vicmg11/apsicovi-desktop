import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
	<NavStyles>
    <Link href="/autorizado">
			<a className='a'><div>🏠 Visitantes Preautorizados</div></a>
		</Link>
    <Link href="/frecuente">
			<a className='b'><div>🚙 Visitantes Frecuentes</div></a>
		</Link>
		<Link href="/servicio">
			<a className='c'><div>👷‍♀️Servicios</div></a>
		</Link>
    <Link href="/domestico">
			<a className='d'><div>🚶‍♀️Personal Domestico</div></a>
		</Link>
    <Link href="/boletin">
			<a className='e'><div>📰 Boletin</div></a>
		</Link>
		<Link href="/historial">
			<a className='f'><div>📖 Historial</div></a>
		</Link>
		<Link href="/cancelar">
			<a className='g'><div>⛔ Cancelar Visitas</div></a>
		</Link>
		{/*}
		<Link href="/pago">
			<a><div>Pagar</div></a>
		</Link>
		{*/}
	</NavStyles>
);

export default Nav;
