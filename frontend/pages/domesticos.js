import Visitantes from '../components/Visitantes';
import PleaseSignIn from '../components/PleaseSigning';

const Domesticos = (props) => (
	<div>
		<PleaseSignIn>
			<Visitantes visitorType="domestico" />
		</PleaseSignIn>
	</div>
);

export default Domesticos;
