import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import 'semantic-ui-css/semantic.min.css';
import {Icon} from 'semantic-ui-react';

const Nav = () => (
	<NavStyles>
    <Link href="/lista">
			<a className='a'><div><Icon name="id card outline"/> Visitantes Preautorizados</div></a>
		</Link>
    <Link href="/frecuente">
			<a className='b'><div><Icon name="users"/> Visitantes Frecuentes</div></a>
		</Link>
		<Link href="/servicio">
			<a className='c'><div><Icon name="truck"/> Servicios</div></a>
		</Link>
    <Link href="/domestico">
			<a className='d'><div><Icon name="shopping basket"/>Personal Domestico</div></a>
		</Link>
    <Link href="/boletin">
			<a className='e'><div><Icon name="newspaper outline"/> Boletin</div></a>
		</Link>
		<Link href="/historial">
			<a className='f'><div><Icon name="history"/> Historial</div></a>
		</Link>
		<Link href="/cancelar">
			<a className='g'><div><Icon name="eye slash outline"/> Cancelar Visitas</div></a>
		</Link>
		{/*}
		<Link href="/pago">
			<a><div>Pagar</div></a>
		</Link>
		{*/}
	</NavStyles>
);

export default Nav;
