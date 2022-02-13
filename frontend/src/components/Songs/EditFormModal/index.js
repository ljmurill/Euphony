import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditSong from './EditSongs';
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function EditFormModal({song}) {

  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <FontAwesomeIcon icon='pen-to-square' color="white" onClick={() => {

          setShowModal(true)
    }}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong theSong={song} setShowModal ={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditFormModal;
