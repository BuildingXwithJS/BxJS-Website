import 'bulma/css/bulma.min.css';
import Navbar from '../components/navbar';

export default () => {
  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Hello World</h1>
      <p className="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>
  );
};
