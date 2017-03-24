import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher.js';

class ToastrStore extends EventEmitter{
    constructor(){
        super();
    }

    handleActions(action){
        switch(action.type){
            case "SHOW_SUCCESS_TOAST":
                break;
        }
    }
}

const toastrStoreInstance = new ToastrStore;
toastrStoreInstance.dispatchId = Dispatcher.register(toastrStoreInstance.handleActions.bind(toastrStoreInstance));

export default toastrStoreInstance;