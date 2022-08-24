/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { Fragment, React } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
  const { onClose } = props;
  return <div className="loader-backdrop" onClick={() => onClose()} />;
};

const ModalOverlay = props => {
  const { children } = props;
  return (
    <div className="modal-loader">
      <div className="loader-content">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Loader = props => {
  const { children, onClose } = props;
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </Fragment>
  );
};

export default Loader;
