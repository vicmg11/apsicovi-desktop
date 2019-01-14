import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

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

	render() {
		const { visitor } = this.props;
		return (
			<div>
				<div className="ui cards">
					<div className="card">
						<div className="content">
							<img className="right floated mini ui image" src={visitor.image} />
							<div className="header">{visitor.name}</div>
							<div className="meta">Acceso a Visitante Preautorizado</div>
							<div className="description">
								<div>Fecha: {visitor.expectedStartDate}</div>
								<div>
									Hora: entre {visitor.expectedStartTime} y {visitor.expectedStartTime}
								</div>
								<div>Motivio de la Visita: {visitor.description}</div>
							</div>
						</div>
						<div className="extra content">
							<div className="ui two buttons">
								<div className="ui basic green button" onClick={this.updateVisit}>
									<Icon name="pencil alternate" /> Edit
								</div>
								<div className="ui basic red button">
									<Icon name="trash alternate" /> Delete
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
