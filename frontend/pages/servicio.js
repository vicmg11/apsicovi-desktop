import CrearVisitante from '../components/CrearVisitante';
import PleaseSignIn from '../components/PleaseSigning';

const Servicio = (props) => (
	<div>
		<PleaseSignIn>
			<CrearVisitante visitorType="servicio"/>
		</PleaseSignIn>
	</div>
);

export default Servicio;