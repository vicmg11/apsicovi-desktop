import SingleVisitor from '../components/SingleVisitor';
import PleaseSignIn from '../components/PleaseSigning';

const Visita = (props) => (
	<div>
		<PleaseSignIn>
			<SingleVisitor id={props.query.id} />
		</PleaseSignIn>
	</div>
);

export default Visita;
