import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

class RequestReset extends Component {
	state = {
		email: ''
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
				{(reset, { error, loading, called }) => {
					return (
						<Form
							method="post"
							className="ui form"
							onSubmit={async (e) => {
								e.preventDefault();
								await reset();
								this.setState({ email: '' });
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<div className="title">Cambio de Contraseña</div>
								<Error error={error} />
								{!error &&
								!loading &&
								called && <p className="alert">Revisa tu e-mail para el cambio de contraseña</p>}
								<label htmlFor="email">
									Email
									<input
										type="email"
										name="email"
										placeholder="Email"
										value={this.state.email}
										onChange={this.saveToState}
									/>
								</label>

								<button className="ui blue button" type="submit">
									Cambia Contraseña
								</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default RequestReset;
