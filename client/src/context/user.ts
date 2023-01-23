import {socket} from './socket';

export var user = {
    id: socket.id,
    name: '',
    isTurn : false,
    isReady: false
}