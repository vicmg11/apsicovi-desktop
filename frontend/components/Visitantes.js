import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Visitante from './Visitante';

const ALL_VISITORS_QUERY = gql`
	query ALL_VISITORS_QUERY {
		visitantes {
      id
			name
			userType
			image
			largeImage
			licensePlate
			description
		}
	}
`;

const Center = styled.div`text-align: center;`;

const VisitorList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

class Visitantes extends Component {
	render() {
		return (
			<Center>
				<p>Visitantes</p>
				<Query query={ALL_VISITORS_QUERY}>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						console.log(data);
						return (
							<VisitorList>
								{data.visitantes.map((visitante) => (
									<Visitante visitante={visitante} key={visitante.id} />
								))}
							</VisitorList>
						);
					}}
				</Query>
			</Center>
		);
	}
}

export default Visitantes;
export { ALL_VISITORS_QUERY };
