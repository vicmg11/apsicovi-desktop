import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

const SINGLE_VISITOR_QUERY = gql`
	query SINGLE_VISITOR_QUERY($id: ID!) {
		visitor(where: { id: $id }) {
			id
			name
			image
			largeImage
			description
			expectedStartTime
			expectedEndTime
			expectedStartDate
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
		$expectedStartTime: String
		$expectedEndTime: String
		$expectedStartDate: String
	) {
		updateVisitor(
			id: $id
			name: $name
			image: $image
			largeImage: $largeImage
			description: $description
			expectedStartTime: $expectedStartTime
			expectedEndTime: $expectedEndTime
			expectedStartDate: $expectedStartDate
		) {
			id
			name
			image
			largeImage
			description
			expectedStartTime
			expectedEndTime
			expectedStartDate
		}
	}
`;

class UpdateVisit extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};
	handleChangeDt = (event, { name, value }) => {
		this.setState({ [name]: value });
	};
	updateVisitor = async (e, updateVisitorMutation) => {
		e.preventDefault();
		console.log('Updating Visitor!!');
		console.log(this.state);
		const res = await updateVisitorMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		console.log('Updated!!');
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
					return (
						<Mutation mutation={UPDATE_VISITOR_MUTATION} variables={this.state}>
							{(updateVisitor, { loading, error }) => (
								<Form className="ui form" onSubmit={(e) => this.updateVisitor(e, updateVisitor)}>
									<Error error={error} />
									{console.log(data.visitor)}
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="name">
											Nombre
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
											Fecha de Visita
											<DateInput
												name="expectedStartDate"
												placeholder="Fecha de Visita"
												required
												value={data.visitor.expectedStartDate}
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
												value={data.visitor.expectedStartTime}
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
												value={data.visitor.expectedEndTime}
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
											Sav{loading ? 'ing' : 'e'} Changes
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

export default UpdateVisit;
export { UPDATE_VISITOR_MUTATION };
