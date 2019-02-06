import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import { CURRENT_USER_QUERY } from './User';

const Logout = styled.div`
  color: ${(props) => props.theme.buttonBlue};
  font-size: 2rem;
  position: fixed;
  top: 10px;
  right: 28px;
  z-index: 3;
  width: 22px;
  height: 30px; 
  i {
    height: 0px;
  }
`;

const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signout {
			message
		}
	}
`;
const Signout = (props) => (
	<Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[ { query: CURRENT_USER_QUERY } ]}>
		{(signout) => (
			<Logout onClick={signout}>
				<Icon name="sign out alternate" />
			</Logout>
		)}
	</Mutation>
);

export default Signout;
