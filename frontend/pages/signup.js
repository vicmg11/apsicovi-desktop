import Signup from '../components/Signup';
import PleaseSignIn from '../components/PleaseSigning';

//Todo Solo admin podra accesar este metodo
const SignupPage = (props) => (
	<div>
		<PleaseSignIn>
			<Signup />
		</PleaseSignIn>
	</div>
);

export default SignupPage;
