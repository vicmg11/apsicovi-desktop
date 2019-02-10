import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Router from 'next/router';
import gql from 'graphql-tag';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Button, Card, Image } from 'semantic-ui-react';
import { UPDATE_VISITOR_MUTATION } from './UpdateVisitor';
import styled from 'styled-components';

const Disable = styled.span`
	font-size: 12px;
	color: #cccccc;
	padding-left: 5px;
`;

const UPDATE_STATUS_MUTATION = gql`
	mutation updateVisitorMutation($status: [Status], $id: ID!) {
		updateVisitorStatus(status: $status, id: $id) {
			id
			status
		}
	}
`;

export default class Visitante extends Component {
	static propTypes = {
		visitor: PropTypes.object.isRequired
	};

	updateVisit = (e) => {
		const { id } = this.props.visitor;
		Router.push({
			pathname: '/update',
			query: { 
				id: id,
			}
		});
	};

	render() {
		const { visitor } = this.props;
		return (
			<Card.Group>
				<Card style={{ width: '98%', margin: '2px auto' }}>
					<Card.Content style={{ paddingBottom: '0.1em' }}>
						<Image floated="right" size="mini" src={visitor.image || '../static/user_gray.png'} />
						<Card.Header>
							{visitor.name}
							<Disable>{visitor.status != 'ACTIVE' && '(Deshabilitado)'}</Disable>
						</Card.Header>
						<Card.Meta>{visitor.description}</Card.Meta>
						<Card.Description>
							<div>
								<b>Fecha visita:</b> {visitor.expectedStartDate}
							</div>
							<div>
								<b>Hora visita:</b> Entre {visitor.expectedStartTime} y {visitor.expectedEndTime} hrs.
							</div>
						</Card.Description>
					</Card.Content>
					{visitor.status == 'ACTIVE' && (
						<Card.Content extra style={{ padding: '.1em 1em' }}>
							<div className="ui two buttons">
								<Button basic color="green" onClick={this.updateVisit}>
									Actualizar
								</Button>
								<Mutation
									mutation={UPDATE_STATUS_MUTATION}
									variables={{
										id: visitor.id,
										status: 'INACTIVE'
									}}
								>
									{(update, { loading, error }) => (
										<Button basic color="red" disabled={loading} onClick={update}>
											Deshabilitar
										</Button>
									)}
								</Mutation>
							</div>
						</Card.Content>
					)}
				</Card>
			</Card.Group>
		);
	}
}
