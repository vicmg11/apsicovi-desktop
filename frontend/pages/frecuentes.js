import Visitantes from '../components/Visitantes';
import PleaseSignIn from '../components/PleaseSigning';

const Frecuente = (props) => (
	<div>
		<PleaseSignIn>
			<Visitantes visitorType="frecuente" />
		</PleaseSignIn>
	</div>
);

export default Frecuente;
