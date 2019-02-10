import CrearVisitante from '../components/CrearVisitante';
import PleaseSignIn from '../components/PleaseSigning';

const Autorizado = (props) => (
	<div>
		<PleaseSignIn>
			<CrearVisitante visitorType="preautorizado"/>
		</PleaseSignIn>
	</div>
);

export default Autorizado;