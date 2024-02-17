//External Lib Import
import toast from 'cogo-toast';

class ToastMessage {
  static successMessage(msg) {
    return toast.success(msg, {
      position: 'top-center',
    });
  }
  static errorMessage(msg) {
    return toast.error(msg, {
      position: 'top-center',
    });
  }
}

export default ToastMessage;
