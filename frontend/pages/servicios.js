import Visitantes from '../components/Visitantes';
import PleaseSignIn from '../components/PleaseSigning';

const Servicios = (props) => (
	<div>
		<PleaseSignIn>
			<Visitantes visitorType="servicio" />
		</PleaseSignIn>
	</div>
);

export default Servicios;
