import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

const Logo = styled.h1`
	font-size: 3.5rem;
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	a {
		padding: 0.5rem 1rem;
		color: ${(props) => props.theme.buttonBlue};
		text-decoration: none;
		border-radius: 4px;
	}
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
	}
`;

const StyledHeader = styled.header`
	position: fixed;
	top: 0px;
	width: 100%;
	z-index: 3;
	height: 46px;
	background-color: #f4f4f4;
	.bar {
    padding: 0 25px;
    margin: 0;
		display: grid;
		text-align: center;
		grid-template-columns: 1fr 20px;
		justify-content: space-between;
		align-items: stretch;
    margin-bottom: 10px;
    border-bottom: 1px solid #8f8f8f;
		/* @media (max-width: 1300px) {
			justify-content: center;
		} */
	}
`;

const Header = () => (
	<StyledHeader>
		<div className="bar">
			<Logo>
				<Link href="/">
					<a>
						<Icon name="home" /> SICOVI
					</a>
				</Link>
			</Logo>
		</div>
	</StyledHeader>
);

export default Header;
