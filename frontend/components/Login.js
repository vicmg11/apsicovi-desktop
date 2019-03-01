import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

const BtnPassword = styled.div `
  color: #22568D90;
	text-align: right;
`;

class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	forgotPass = (e) => {
		Router.push({
			pathname: '/identify'
		});
	};
	render() {
		return (
			<Mutation
				mutation={SIGNIN_MUTATION}
				variables={this.state}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(signin, { error, loading }) => {
					return (
						<Form
							method="post"
							className="ui form"
							onSubmit={async (e) => {
								e.preventDefault();
								await signin();
								this.setState({ email: '', password: '' });
								Router.push({
									pathname: '/'
								});
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<div className="title">Accesar App</div>
								<Error error={error} />
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

								<label htmlFor="password">
									Contraseña
									<input
										type="password"
										name="password"
										placeholder="Contraseña"
										value={this.state.password}
										onChange={this.saveToState}
									/>
								</label>
								<BtnPassword onClick={this.forgotPass}>Olvidaste tu contranseña?</BtnPassword>
								<button className="ui blue button" type="submit">
								  Accesar Cuenta
								</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default Login;
