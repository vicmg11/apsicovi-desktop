import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

const SingleItemStyles = styled.div`
  .card {
    width: 100% !important;
  }
  .ui.button {
    padding: 15px;
    font-size: 1.5rem;
  }
`;

const SINGLE_VISITOR_QUERY = gql`
	query SINGLE_VISITOR_QUERY($id: ID!) {
		visitor(where: { id: $id }) {
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
class SingleVisitor extends Component {
	render() {
		return (
			<Query
				query={SINGLE_VISITOR_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					console.log(data);
					if (!data.visitor) return <p>No se encontro el visitante...</p>;
					const visitor = data.visitor;
					return (
						<SingleItemStyles>
							<div className="ui cards">
								<div className="card">
									<div className="content">
										<img className="right floated mini ui image" src={visitor.image} />
										<div className="header">{visitor.name}</div>
										<div className="meta">Acceso a Visitante Preautorizado</div>
                    <div className="description">
                      <div>Fecha: {visitor.expectedStartDate}</div>
                      <div>Hora: entre {visitor.expectedStartTime} y {visitor.expectedStartTime}</div>
                      <div>Motivio de la Visita: {visitor.description}</div>
                    </div>
									</div>
								</div>
							</div>
						</SingleItemStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleVisitor;
export { SINGLE_VISITOR_QUERY };
