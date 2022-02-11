import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../../Songs/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeSong } from '../../../store/songs';


function DeleteFormModal({song}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async(e) => {

    e.preventDefault();
    const finished = await dispatch(removeSong(song.id))
        .catch(async (res) => {
            const data = await res.json();
        })

    if(finished && finished.status === 200){
        setShowModal(false);
        history.push(`/`)
    }

  }

  return (
    <>
      <FontAwesomeIcon icon='trash-can' className="trashCan" color="white" onClick={() => {
            // removeAttribute()
          setShowModal(true)
    }}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div className='deleteForm'>
                <FontAwesomeIcon icon="fa-brands fa-soundcloud" className='deleteFormSoundCloud' size='3x'/>
                {/* <i className="fa-brands fa-soundcloud fa-2x deleteFormSoundCloud"></i> */}
                <h1 className='confirmationDelete'>Are you sure you want to Delete?</h1>

                <div className='deleteFormButtons'>
                    <button className='deleteCancelButton' onClick={handleDelete}>Delete</button>
                    <button className='deleteCancelButton' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteFormModal;
