import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onRouteChangeError = () => {
  NProgress.done();
}

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.buttonBlue};
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    padding: 15px;
    display: grid;
    height: 70px;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

const Header = () => (
	<StyledHeader>
		<div className="bar">
			<Logo>
				<Link href="/">
					<a><i className="angle double down icon"></i> SICOVI</a>
				</Link>
			</Logo>
		</div>
	</StyledHeader>
);

export default Header;
