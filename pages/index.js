import 'bulma/css/bulma.min.css';
import Navbar from '../components/navbar';

export default () => {
  return (
    <div class="container">
      <Navbar />
      <h1 class="title">Hello World</h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
    </div>
  );
};
