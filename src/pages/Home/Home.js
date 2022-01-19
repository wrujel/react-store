import react from 'react';
import './Home.css';
import ProductCard from '../../components/ProductCard.js';

class Home extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('https://fakestoreapi.com/products?limit=9')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          items: result
        });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="Home">
        <h1>Products</h1>
        <div className="wrapper">
          {items.map((item) => (
            <ProductCard key={item.id} id={item.id} title={item.title} img={item.image} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
