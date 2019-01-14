import Visitantes from '../components/Visitantes';

const Lista = props => (
  <div>
    <Visitantes page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Lista;