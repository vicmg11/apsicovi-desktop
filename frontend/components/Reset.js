import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
		resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
			id
			email
			name
		}
	}
`;

class Reset extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	};
	state = {
		password: '',
		confirmPassword: ''
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		return (
			<Mutation
				mutation={RESET_MUTATION}
				variables={{
					resetToken: this.props.resetToken,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword
				}}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(reset, { error, loading, called }) => {
					return (
						<Form
							method="post"
							className="ui form"
							onSubmit={async (e) => {
								e.preventDefault();
								await reset();
                this.setState({ password: '', confirmPassword: '' });
                Router.push({
                  pathname: '/'
                });
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<div className="title">Cambio de Contraseña</div>
								<Error error={error} />
								<label htmlFor="password">
									Nueva Contranseña
									<input
										type="password"
										name="password"
										placeholder="Contranseña"
										value={this.state.password}
										onChange={this.saveToState}
									/>
								</label>

								<label htmlFor="confirmPassword">
									Confirmación Contranseña
									<input
										type="password"
										name="confirmPassword"
										placeholder="Contranseña"
										value={this.state.confirmPassword}
										onChange={this.saveToState}
									/>
								</label>

								<button className="ui blue button" type="submit">
									Proceder
								</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default Reset;
