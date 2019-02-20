import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import FotoVisitor from './styles/FotoVisitor';

const SINGLE_VISITOR_QUERY = gql`
	query SINGLE_VISITOR_QUERY($id: ID!) {
		visitor(where: { id: $id }) {
			id
			name
			image
			largeImage
			visitorType
			description
			expectedStartDate
			expectedStartTime
			expectedEndTime
		}
	}
`;
const UPDATE_VISITOR_MUTATION = gql`
	mutation UPDATE_VISITOR_MUTATION(
		$id: ID!
		$name: String
		$image: String
		$largeImage: String
		$description: String
		$expectedStartDate: String
		$expectedStartTime: String
		$expectedEndTime: String
	) {
		updateVisitor(
			id: $id
			name: $name
			image: $image
			largeImage: $largeImage
			description: $description
			expectedStartDate: $expectedStartDate
			expectedStartTime: $expectedStartTime
			expectedEndTime: $expectedEndTime
		) {
			id
			name
			image
			largeImage
			description
			expectedStartDate
			expectedStartTime
			expectedEndTime
		}
	}
`;

class UpdateVisitor extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	handleChangeDt = (event, { name, value }) => {
		this.setState({ [name]: value });
	};

	uploadFile = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sicovi');
		const res = await fetch('https://api.cloudinary.com/v1_1/ddltr8h2k/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};

	updateVisitor = async (e, updateVisitorMutation, visitorType) => {
		e.preventDefault();
		const res = await updateVisitorMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		Router.push({
			pathname: '/' + visitorType + 's'
		});
	};

	render() {
		return (
			<Query
				query={SINGLE_VISITOR_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.visitor) return <p>No Visitor Found for ID... {this.props.id}</p>;
					const visitorType = data.visitor.visitorType;
					return (
						<Mutation mutation={UPDATE_VISITOR_MUTATION} variables={this.state}>
							{(updateVisitor, { loading, error }) => (
								<Form
									className="ui form"
									onSubmit={(e) => this.updateVisitor(e, updateVisitor, visitorType)}
								>
									<Error error={error} />
									<div className="title">Actualiza Visitante {visitorType}</div>
									<fieldset className="fields" disabled={loading} aria-busy={loading}>
										{visitorType !== 'servicio' && (
											<label htmlFor="file">
												Foto
												<input
													type="file"
													id="file"
													name="file"
													placeholder="Foto del Visitante"
													onChange={this.uploadFile}
												/>
												<img
													className="ui circular bordered image"
													width="100"
													height="100"
													src={
														this.state.image ||
														data.visitor.image ||
														'../static/user_gray.png'
													}
													alt="Agrega una foto"
												/>
												<FotoVisitor>
													<Icon name="camera" />
												</FotoVisitor>
											</label>
										)}
										<label htmlFor="name">
											Nombre {visitorType === 'servicio' && 'de la Empresa'}
											<input
												type="text"
												id="name"
												name="name"
												placeholder="Nombre"
												required
												defaultValue={data.visitor.name}
												onChange={this.handleChange}
											/>
										</label>

										<label htmlFor="expectedStartDate">
											Hora Inicial de Visita
											<DateTimeInput
												name="expectedStartDate"
												placeholder="Hora Inicial de Visita"
												required
												value={this.state.expectedStartDate || data.visitor.expectedStartDate}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>

										<label htmlFor="expectedStartTime">
											Hora Inicial de Visita
											<TimeInput
												name="expectedStartTime"
												placeholder="Hora Inicial de Visita"
												required
												value={this.state.expectedStartTime || data.visitor.expectedStartTime}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>

										<label htmlFor="expectedEndTime">
											Hora Final de Visita
											<TimeInput
												name="expectedEndTime"
												placeholder="Hora final de visita"
												required
												value={this.state.expectedEndTime || data.visitor.expectedEndTime}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>

										<label htmlFor="description">
											Motivo de Visita
											<textarea
												id="description"
												name="description"
												rows="2"
												placeholder="Motivo de Visita"
												required
												defaultValue={data.visitor.description}
												onChange={this.handleChange}
											/>
										</label>
										<button className="ui positive button" type="submit">
											Guarda{loading ? 'ndo' : 'r'} Cambios
										</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdateVisitor;
export { UPDATE_VISITOR_MUTATION };
