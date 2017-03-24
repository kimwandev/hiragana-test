import Dispatcher from '../Dispatcher.js';

export function AddNewVocabulary(){
    Dispatcher.dispatch({
        type: 'SHOW_SUCCESS_TOAST'
    })
}