import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ModalProvider } from "./context/Modal";

import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faSoundcloud, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faImage, faCircleCheck, faFileAudio, faFileImage, faHeadphones, faEllipsis, faPenToSquare, faTrashCan, faCirclePlay, faCircleUser, faCirclePause} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCircleCheck, faFileAudio, faFileImage, faImage, faHeadphones, faEllipsis, faPenToSquare, faTrashCan, faSoundcloud, faCirclePlay, faCircleUser, faGithub, faLinkedin, faCirclePause)

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store= {store}>

      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>

    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
