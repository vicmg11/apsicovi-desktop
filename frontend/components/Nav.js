import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import User from './User';
import Signout from './Signout';
import Login from './Login'

const Nav = () => (
	<User>
		{({ data: { me } }) => (
			<NavStyles>
				{me && (
					<>
					  <div className="main-links">
							<Link href="/preautorizados">
								<a className="a">
									<div>
										<Icon name="id card outline" /> Visitantes Preautorizados
									</div>
								</a>
							</Link>
							<Link href="/frecuentes">
								<a className="b">
									<div>
										<Icon name="users" /> Visitantes Frecuentes
									</div>
								</a>
							</Link>
							<Link href="/servicio">
								<a className="c">
									<div>
										<Icon name="truck" /> Servicios
									</div>
								</a>
							</Link>
							<Link href="/domestico">
								<a className="d">
									<div>
										<Icon name="shopping basket" />Personal Domestico
									</div>
								</a>
							</Link>
							<Link href="/boletin">
								<a className="e">
									<div>
										<Icon name="newspaper outline" /> Boletin
									</div>
								</a>
							</Link>
							<Link href="/historial">
								<a className="f">
									<div>
										<Icon name="history" /> Historial
									</div>
								</a>
							</Link>
							<Link href="/cancelar">
								<a className="g">
									<div>
										<Icon name="eye slash outline" /> Cancelar Visitas
									</div>
								</a>
							</Link>
						</div>
						<Signout />
					</>
				)}
				{!me && (
					<Login />
				)}
			</NavStyles>
		)}
	</User>
);

export default Nav;
