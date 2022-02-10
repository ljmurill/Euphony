import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditSong from './EditSongs';
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from '../../Navigation';

function EditFormModal({song}) {

  const [showModal, setShowModal] = useState(false);
//   function removeAttribute(){
//       const div = document.getElementById('modal-content');
//       console.log('HELLO', div)
//       div.removeAttribute('id')
//   }

  return (
    <>
      <FontAwesomeIcon icon='pen-to-square' color="white" onClick={() => {
            // removeAttribute()
          setShowModal(true)
    }}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong theSong={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditFormModal;
