import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
const defaultImage = 'https://preview.redd.it/e1l2mfuraia51.jpg?width=960&crop=smart&auto=webp&s=598397a1367b7a4a7c273d10a0298d6b848a1c94';

function LoginSearchModal({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div className="data" onClick={() => setShowModal(true)}>
            <img className ='imageOnRightSide' alt='' src={song.imageUrl ? song.imageUrl : defaultImage}/>
            <div className='titleNameRight'>
                <div className='titleRelated'>
                    {song.title}
                </div>
                <div className='usernameRelated'>
                    {song.User.username}
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

export default LoginSearchModal;
