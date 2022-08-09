import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSong from '../Songs/CreateSong';


function UploadModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {/* <Link to='/songs/create'><button className="uploadButton">Upload Your Own</button></Link> */}
        <button onClick={() => setShowModal(true)} className="uploadButton">Upload Your Own</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSong setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UploadModal;
