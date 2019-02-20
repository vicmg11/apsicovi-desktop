import CrearVisitante from '../components/CrearVisitante';
import PleaseSignIn from '../components/PleaseSigning';

const Preautorizado = (props) => (
	<div>
		<PleaseSignIn>
			<CrearVisitante visitorType="preautorizado"/>
		</PleaseSignIn>
	</div>
);

export default Preautorizado;