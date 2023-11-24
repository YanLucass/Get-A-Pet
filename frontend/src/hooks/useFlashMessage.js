import bus from '../utils/bus'

//criar função que dispara o evento

export default function useFlashMessage() {
    function setFlashMessage(msg, type) {
        bus.emit('flash', {
            message: msg,
            type: type,
        });
    }

    return { setFlashMessage }
}