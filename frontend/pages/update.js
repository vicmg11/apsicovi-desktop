import UpdateVisit from '../components/UpdateVisitor';

const Update = ({ query }) => (
  <div>
    <UpdateVisit id={query.id} />
  </div>
);

export default Update;
