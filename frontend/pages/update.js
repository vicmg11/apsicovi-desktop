import UpdateVisitor from '../components/UpdateVisitor';
import PleaseSignIn from '../components/PleaseSigning';

const Update = ({ query }) => (
	<div>
		<PleaseSignIn>
			<UpdateVisitor id={query.id} />
		</PleaseSignIn>
	</div>
);

export default Update;
