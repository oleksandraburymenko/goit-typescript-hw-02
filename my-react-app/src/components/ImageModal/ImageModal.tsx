import Modal from 'react-modal';
import React, { FC } from 'react';
import { ImageModalProps } from '../../types';



const ImageModal: FC<ImageModalProps> = ({ openModal, CloseModal, id }) => {
    Modal.setAppElement('#root')

    return <> 
    <Modal 
    isOpen={openModal}  
    onRequestClose={CloseModal}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgb(28, 28, 28, 0.8)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "",
        },
      }}
    >
         <div>
        <img src={id} alt="Image" />
      </div>
    </Modal>
    </>
}

export default ImageModal;