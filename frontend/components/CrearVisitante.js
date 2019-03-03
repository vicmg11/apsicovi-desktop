import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import Error from './ErrorMessage';
import Form from './styles/Form';
import PhotoCropper from './PhotoCropper';
import { isNull } from 'util';

const CREATE_VISIT_MUTATION = gql`
	mutation CREATE_VISIT_AUTH_MUTATION(
		$name: String!
		$visitorType: String
		$status: String
		$image: String
		$largeImage: String
		$description: String
		$expectedStartDate: String
		$expectedStartTime: String
		$expectedEndTime: String
	) {
		createVisitor(
			name: $name
			visitorType: $visitorType
			status: $status
			image: $image
			largeImage: $largeImage
			description: $description
			expectedStartDate: $expectedStartDate
			expectedStartTime: $expectedStartTime
			expectedEndTime: $expectedEndTime
		) {
			id
		}
	}
`;

class CrearVisitante extends Component {
	state = {
		name: '',
		visitorType: this.props.visitorType,
		image: '',
		largeImage: '',
		description: '',
		expectedStartDate: '',
		expectedStartTime: '',
		expectedEndTime: '',
		preview: null,
		disabled: false
	};

	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	handleChangeDt = (event, { name, value }) => {
		if (this.state.hasOwnProperty(name)) {
			this.setState({ [name]: value });
		}
	};

	UploadPhoto = async (e) => {
		const data = new FormData();
		if (isNull(this.state.preview)) return;
		data.append('file', this.state.preview);
		data.append('upload_preset', 'sicovi');
		const res = await fetch('https://api.cloudinary.com/v1_1/ddltr8h2k/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url,
		});
	}

	render() {
		const { visitorType } = this.props;
		return (
			<Mutation mutation={CREATE_VISIT_MUTATION} variables={this.state}>
				{(createVisitor, { loading, error }) => (
					<Form
						className="ui form"
						onSubmit={async (e) => {
							this.setState({disabled: true});
							// Stop de form from submitting
							e.preventDefault();
							//Upload Photo
					  	await this.UploadPhoto();
							// call the mutation
							const res = await createVisitor();
							Router.push({
								pathname: '/' + visitorType + 's'
							});
						}}
					>
						<Error error={error} />
						<div className="title">Visitantes {visitorType}s</div>
						<fieldset disabled={loading} aria-busy={loading}>
							{visitorType !== 'servicio' && !loading && (
								<div className="field">
									<PhotoCropper
										preview={this.state.preview}
										updateSrc={(preview)=>this.setState({preview})}
									/>
								</div>
 							)}

							<div className="field">
								<label htmlFor="name">
									Nombre {visitorType === 'servicio' && 'de la Empresa'}
									<input
										type="text"
										id="name"
										name="name"
										placeholder="Nombre"
										required
										value={this.state.name}
										onChange={this.handleChange}
									/>
								</label>
							</div>

							{visitorType !== 'frecuente' && (
								<>
								  <div className="field"> 
										<label htmlFor="expectedStartDate">
											Fecha de Visita
											<DateInput
												name="expectedStartDate"
												placeholder="Fecha de Visita"
												required
												value={this.state.expectedStartDate}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>
									</div>

									<div className="field">
										<label htmlFor="expectedStartTime">
											Hora Inicial de Visita
											<TimeInput
												name="expectedStartTime"
												placeholder="Hora Inicial de Visita"
												required
												value={this.state.expectedStartTime}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>
									</div>

									<div className="field"> 
										<label htmlFor="expectedEndTime">
											Hora Final de Visita
											<TimeInput
												name="expectedEndTime"
												placeholder="Hora final de visita"
												required
												value={this.state.expectedEndTime}
												iconPosition="left"
												onChange={this.handleChangeDt}
											/>
										</label>
									</div>

									<div className="field">	
										<label htmlFor="description">
											Motivo de Visita
											<textarea
												id="description"
												name="description"
												rows="2"
												placeholder="Motivo de Visita"
												required
												value={this.state.description}
												onChange={this.handleChange}
											/>
										</label>
									</div>
								</>
							)}
							<button disabled={this.state.disabled} className="ui positive button" type="submit">
								Guarda{this.state.disabled ? 'ndo' : 'r'} Cambios
							</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CrearVisitante;
export { CREATE_VISIT_MUTATION };
