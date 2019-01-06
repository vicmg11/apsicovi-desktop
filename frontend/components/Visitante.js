import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class Visitante extends Component {
	static propTypes = {
		visitante: PropTypes.object.isRequired
	};
	render() {
		const { visitante } = this.props;
		return (
			<div>
        {visitante.image && <img src={visitante.image} alt={visitante.title} />}
        <Link
					href={{
						pathname: '/item',
						query: { id: visitante.id }
					}}
				>
					<a>Nombre: {visitante.name}</a>
				</Link>
				<p>Placas de Auto: {visitante.licensePlate}</p>
				<p>Razon: {visitante.description}</p>
        <div className="buttonList">
          <Link 
            href={{
              pathname: 'update',
              query: { id: visitante.id },
            }} >
            <a>Editar ✏️</a>
            </Link>
        </div>
      </div>
		);
	}
}

export default Visitante;
