import react from 'react';
import './ProductCard.css';
import Modal from './Modal.js';

class ProductCard extends react.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.searchDetail = this.searchDetail.bind(this);
    this.startTime = this.startTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.state = {
      isOpen: false,
      isLoaded: false,
      data: {},
      time: { h: '00', m: '00', s: '00' },
      seconds: 0,
      timer: null
    };
  }

  componentDidMount() {
    this.startTime();
  }

  render() {
    return (
      <div className="card" key={this.props.id}>
        <img src={this.props.img} className="card__img" />
        <h2 className="card__title">{this.props.title}</h2>
        <div className="card__body">
          <div className="card__row">
            <div className="card__counter">
              {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
            </div>
            <button className="card__btn" onClick={this.openModal}>
              Go To Detail
            </button>
            <Modal
              isOpen={this.state.isOpen}
              isLoaded={this.state.isLoaded}
              closeModal={this.closeModal}
              data={this.state.data}
            />
          </div>
        </div>
      </div>
    );
  }

  startTime() {
    const min = 10;
    const max = 180;
    const rand = min + Math.floor(Math.random() * (max - min));
    this.setState({ seconds: rand, timer: setInterval(this.countdown, 1000) });
  }

  countdown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (seconds == 0) {
      clearInterval(this.state.timer);
    }
  }

  secondsToTime(sec) {
    let hours = Math.floor(sec / (60 * 60));

    let min_rest = sec % (60 * 60);
    let minutes = Math.floor(min_rest / 60);

    let sec_rest = min_rest % 60;
    let seconds = Math.floor(sec_rest);

    return { h: this.formatTime(hours), m: this.formatTime(minutes), s: this.formatTime(seconds) };
  }

  formatTime(val) {
    return String(val).length === 1 ? `0${val}` : `${val}`;
  }

  async openModal() {
    if (this.state.seconds > 0) {
      this.setState({ isOpen: true });
      const res = await this.searchDetail();
      return res;
    }
  }

  closeModal() {
    this.setState({ isOpen: false, isLoaded: false });
  }

  async searchDetail() {
    const res = await fetch(`https://fakestoreapi.com/products/${this.props.id}`);
    const result = await res.json();
    this.setState({
      data: result,
      isLoaded: true
    });
  }
}

export default ProductCard;
