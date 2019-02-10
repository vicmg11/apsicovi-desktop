import Visitantes from '../components/Visitantes';
import PleaseSignIn from '../components/PleaseSigning';

const Preautorizado = (props) => (
	<div>
		<PleaseSignIn>
			<Visitantes visitorType="preautorizado" />
		</PleaseSignIn>
	</div>
);

export default Preautorizado;
