import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeHIIcFMVgpob7AJ9q43rWp7fjzsndrvo',
  appId: '1:815318095841:web:b7aedf2192fa763df3e4a0',
  authDomain: 'framtidsportalen-ebc81.firebaseapp.com',
  databaseURL: 'https://framtidsportalen-ebc81.firebaseio.com',
  measurementId: 'G-T6H706EMR5',
  messagingSenderId: '815318095841',
  projectId: 'framtidsportalen-ebc81',
  storageBucket: 'framtidsportalen-ebc81.appspot.com',
};

function initFirebase(){
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
}

initFirebase();
export { firebase };
