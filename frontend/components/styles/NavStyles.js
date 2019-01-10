import styled from 'styled-components';

const NavStyles = styled.ul`
	margin: 20px 0px;
	padding: 0;
	justify-self: end;
	font-size: 1.2rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 5px;
	grid-auto-rows: minmax(100px, auto);
	a,
	button {
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		position: relative;
		font-size: 1.2em;
		background: none;
		border: 0;
		cursor: pointer;
    background: linear-gradient(#3b73a6, #255186);
    color: #ffffff;
    margin-bottom: 10px;
		@media (max-width: 700px) {
			font-size: 1.2em;
		}
		div {
			width: 100%;
			line-height: 20px;
			text-align: center;
		}
		&:hover,
		&:focus {
			outline: none;
			background-color: ${(props) => props.theme.lightBlue};
		}
	}
	.a {
		grid-column: 1 / 3;
		grid-row: 1;
    border-top-left-radius: ${(props) => props.theme.radiusBorder};
    border-top-right-radius: ${(props) => props.theme.radiusBorder};
	}
	.b {
		grid-column: 1;
		grid-row: 2;
    border-top-right-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-left-radius: ${(props) => props.theme.radiusBorder};
	}
	.c {
		grid-column: 2;
		grid-row: 2;
    border-top-left-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-right-radius: ${(props) => props.theme.radiusBorder};
	}
	.d {
		grid-column: 1;
		grid-row: 3;
    border-top-right-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-left-radius: ${(props) => props.theme.radiusBorder};
	}
	.e {
		grid-column: 2;
		grid-row: 3;
    border-top-left-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-right-radius: ${(props) => props.theme.radiusBorder};
	}
	.f {
		grid-column: 1;
		grid-row: 4;
    border-top-right-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-left-radius: ${(props) => props.theme.radiusBorder};
	}
	.g {
		grid-column: 2;
		grid-row: 4;
    border-top-left-radius: ${(props) => props.theme.radiusBorder};
    border-bottom-right-radius: ${(props) => props.theme.radiusBorder};
	}
	@media (max-width: 1300px) {
		width: 100%;
		justify-content: center;
		font-size: 1.5rem;
	}
`;

export default NavStyles;
