import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Visitante from './Visitante';
//import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_VISITORS_QUERY = gql`
  query ALL_VISITORS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    visitors(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
			name
			userType
			status
			image
			largeImage
			description
			expectedStartTime
			expectedEndTime
			expectedStartDate
    }
  }
`;

const Center = styled.div`text-align: center;`;

const VisitorsList = styled.div`
	/* display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto; */
	.card {
    width: 100% !important;
  }
  .ui.button {
    padding: 15px;
    font-size: 1.5rem;
  }
`;

class Visitantes extends Component {
	render() {
		return (
			<Center>
				<Query
					query={ALL_VISITORS_QUERY}
					// fetchPolicy="network-only"
					variables={{
						skip: this.props.page * perPage - perPage
					}}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						console.log(data);
						return (
							<VisitorsList>
								{data.visitors.map((visitante) => (
									<Visitante visitor={visitante} key={visitante.id} />
								))}
							</VisitorsList>
						);
					}}
				</Query>
			</Center>
		);
	}
}

export default Visitantes;
export { ALL_VISITORS_QUERY };
