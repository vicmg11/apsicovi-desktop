import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { consolidateStreamedStyles } from 'styled-components';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_VISITOR_MUTATION = gql`
	mutation CREATE_VISITOR_MUTATION(
		$name: String!
		#$userType: String!
		$image: String
		$largeImage: String
		$licensePlate: String
		$description: String
	) {
		createVisitor(
			name: $name
			#userType: $description
			image: $image
			largeImage: $largeImage
			licensePlate: $licensePlate
			description: $description
		) {
			id
		}
	}
`;

class CrearVisitante extends Component {
	state = {
		name: '',
		//userType: '',
		image: '',
		largeImage: '',
		licensePlate: '',
		description: ''
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	render() {
		return (
			<Mutation mutation={CREATE_VISITOR_MUTATION} variables={this.state}>
				{(createVisitor, { loading, error }) => (
					<Form
						onSubmit={async e => {
              // Stpo de form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createVisitor();
              // change them to the single visitor page
              Router.push({
                pathname: '/visitante',
                query: { id: res.data.createVisitor.id },
              })
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="name">
								Nombre
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

							{/* <label htmlFor="userType">
								Tipo de Usuario
								<input
									type="text"
									id="userType"
									name="userType"
									placeholder="Tipo de Usuario"
									required
									value={this.state.userType}
									onChange={this.handleChange}
								/>
							</label> */}

							<label htmlFor="licensePlate">
								Place del vehiculo
								<input
									type="text"
									id="licensePlate"
									name="licensePlate"
									placeholder="Place del Vehiculo"
									required
									value={this.state.licensePlate}
									onChange={this.handleChange}
								/>
							</label>

							<label htmlFor="description">
								Motivo de Visita
								<input
									type="text"
									id="description"
									name="description"
									placeholder="Motivo de Visita"
									required
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
              <button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CrearVisitante;
export { CREATE_VISITOR_MUTATION };
