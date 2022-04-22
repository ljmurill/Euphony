import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
const defaultImage = "https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94";

function LoginSongModal({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div className="songBlock" onClick={() => setShowModal(true)}>
            <div className="imageDiv">
                {song.imageUrl ? <img src={song.imageUrl} alt='' className='songImage'/>: <img src={defaultImage} alt='' className='songImage'/>}
            </div>
                <div className="optionsSongs">
                    <div>
                    <p className="songDetails title">{song.title}</p>
                    <p className="songDetails username">{song.User.username}</p>
                    </div>
                </div>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginSongModal;
