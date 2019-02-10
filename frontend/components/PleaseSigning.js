import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Login from './Login';
import styled from 'styled-components';

const PleaseSignIn = (props) => (
	<Query query={CURRENT_USER_QUERY}>
		{({ data, loading }) => {
			if (loading) return <p>Cargando...</p>;
			if (!data.me) {
				return (
					<div>
						<Login />
					</div>
				);
			}
			return props.children;
		}}
	</Query>
);

export default PleaseSignIn;
