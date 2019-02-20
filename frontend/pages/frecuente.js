import CrearVisitante from '../components/CrearVisitante';
import PleaseSignIn from '../components/PleaseSigning';

const Frecuente = (props) => (
	<div>
		<PleaseSignIn>
			<CrearVisitante visitorType="frecuente"/>
		</PleaseSignIn>
	</div>
);

export default Frecuente;
