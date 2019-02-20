import CrearVisitante from '../components/CrearVisitante';
import PleaseSignIn from '../components/PleaseSigning';

const Domestico = (props) => (
	<div>
		<PleaseSignIn>
			<CrearVisitante visitorType="domestico"/>
		</PleaseSignIn>
	</div>
);

export default Domestico;