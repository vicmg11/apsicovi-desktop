import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Router from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import { UPDATE_VISITOR_MUTATION } from './UpdateVisitor';

const disabledClass = {
	opacity: 0.45
};

const enableClass = {
	opacity: 1
};

export default class Visitante extends Component {
	static propTypes = {
		visitor: PropTypes.object.isRequired
	};

	updateVisit = (e) => {
		const { id } = this.props.visitor;
		Router.push({
			pathname: '/update',
			query: { id: id }
		});
	};

	updateStatus = async (e, updateVisitorMutation) => {
		e.preventDefault();
		console.log('Updating Visitor!!');
		const { visitor } = this.props;
		visitor.status = 'INACTIVO';
		const res = await updateVisitorMutation({
			variables: {
				id: visitor.id,
				status: visitor.status
			}
		});
		Router.push({
			pathname: '/lista'
		});
	};

	render() {
		const { visitor } = this.props;
		console.log(visitor);
		const itemStyle = visitor.status == 'INACTIVO' ? disabledClass : enableClass;
		return (
			<div className="item" style={itemStyle}>
				<div className="fix-image">
					<img
						className="ui circular bordered image"
						width="90"
						height="90"
						src={visitor.image || '../static/user_gray.png'}
					/>
				</div>
				<div className="content">
					<h2>{visitor.status == 'INACTIVO' && <Icon name="ban" />} {visitor.name}</h2>
					<div className="description">
						<b>Visita esperada:</b> {visitor.expectedStartDate}
						<br />
						<b>Hora esperada:</b> Entre {visitor.expectedStartTime} y {visitor.expectedEndTime}
					</div>
					<div>
						<b>Motivio de la Visita:</b> {visitor.description}
					</div>
					{visitor.status == 'ACTIVO' && (
						<div className="ui two buttons">
							<div className="ui basic green button" onClick={this.updateVisit}>
								<Icon name="pencil alternate" /> Editar
							</div>
							<Mutation mutation={UPDATE_VISITOR_MUTATION}>
								{(updateVisitor) => (
									<div
										className="ui basic red button"
										onClick={(e) => this.updateStatus(e, updateVisitor)}
									>
										<Icon name="close" /> Deshabilitar
									</div>
								)}
							</Mutation>
						</div>
					)}

				</div>
			</div>
		);
	}
}
