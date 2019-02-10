import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import Visitante from './Visitante';
import { perPage } from '../config';

const ALL_VISITORS_QUERY = gql`
	query ALL_VISITORS_QUERY($visitorType: String) {
		visitors(where: {visitorType : $visitorType} orderBy: createdAt_DESC) {
			id
			name
			visitorType
			status
			image
			largeImage
			description
			expectedStartDate
			expectedStartTime
			expectedEndTime
		}
	}
`;

const Center = styled.div`
	h1 {
		text-align: center;
		margin: 10px 0px;
		border-bottom: 1px solid #ccc !important;
	}
	.ui.message {
		margin: 135px 20px;
		color: ${(props) => props.theme.buttonBlue};
	}
	.alta-visitas {
		font-size: 2rem;
		position: fixed;
		top: 10px;
		z-index: 3;
		width: 28px;
		height: 30px;
		right: 28px;
		color: #22568d !important;
		background: #f4f4f4;
		cursor: pointer;
		i {
			height: 0px;
		}
	}
`;

const VisitorsList = styled.div`
	.content {
		padding-left: 1rem !important;
	}
	.fix-image,
	img {
		width: 90px;
	}
	.description {
		margin-top: 4px !important;
	}
	.item {
		border-bottom: 1px solid #ccc !important;
	}
	.ui.two.buttons {
		margin-bottom: 8px;
	}
	.title {
		text-align: center;
		padding: 10px;
		color: #22568d;
		font-size: 2rem;
	}
`;

class Visitantes extends Component {
	handleVisit = (e) => {
		Router.push({
			pathname: '/' + this.props.visitorType
		});
	};

	render() {
		const { visitorType } = this.props;
		const btnAlta = (
			<div className="alta-visitas" onClick={this.handleVisit}>
				<Icon name="user plus" />
			</div>
		);
		const message = (
			<div>
				{btnAlta}
				<div className="ui huge floating message">
					<p>
						No existen visitantes {visitorType}s, registralos dando click al icono de arriba{' '}
						<Icon name="user plus" />
					</p>
				</div>
			</div>
		);
		return (
			<Center>
				<Query
					query={ALL_VISITORS_QUERY}
					variables={{ visitorType: this.props.visitorType }}
					fetchPolicy="network-only"
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						if (!data.visitors.length) return message;
						return (
							<VisitorsList>
								{btnAlta}
								<div className="title">Visitantes {visitorType}s</div>
								<div className="ui unstackable items">
									{data.visitors.map((visitante) => (
										<Visitante visitor={visitante} key={visitante.id} />
									))}
								</div>
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
