import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

const TheModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 1;
  animation: fade 0.5s linear;

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &.modalClosing {
    opacity: 0;
    animation: fadeOut 0.5s linear;

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

const ModalContentWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  right: 10%;
  z-index: 1001;
  max-height: 80%;
  background-color: #fff;
  padding: 20px;
  overflow: scroll;

  .closeModal {
    position: fixed;
    top: 10%;
    right: 10%;
    z-index: 1002;
    margin: -20px -20px 0 0;
    height: 2em;
    width: 2em;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;

function Modal({ children }) {
  return ReactDOM.createPortal(
    <TheModal>
      <ModalContentWrapper>{children}</ModalContentWrapper>
    </TheModal>,
    document.getElementById('modal-root')
  );
}

export default Modal;
