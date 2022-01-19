/* eslint-disable react/prop-types */
import './Modal.css';

const Modal = ({ isOpen, isLoaded, closeModal, data }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
      <div className={`modal__load ${isLoaded && 'is-loaded'}`}>
        <h3>Cargando...</h3>
      </div>
      <div
        className={`modal__container ${isLoaded && 'is-loaded'}`}
        onClick={handleModalContainerClick}>
        <button className="modal__close" onClick={closeModal}>
          X
        </button>
        <img src={data.image} className="modal__img" />
        <h2 className="modal__title">{data.title}</h2>
        <h3 className="modal__price">{data.price}</h3>
        <div className="modal__description">
          <strong>Descripcion:</strong> {data.description}
        </div>
        <div className="modal__category">
          <strong>Categoria:</strong> {data.category}
        </div>
      </div>
    </article>
  );
};

export default Modal;
