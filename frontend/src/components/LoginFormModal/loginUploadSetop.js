import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginUploadModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="uploadButton" onClick={() => setShowModal(true)}>Upload Your Own</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginUploadModal;
