import { toast } from 'react-hot-toast';
import { ImageToast }  from './ImageToast';

export const successToast = (message) =>
  toast.success(message, {
    duration: 4000,
    style: {
      background: '#fff',
      color: '#333',
    },
    iconTheme: {
      primary: '#4aed88',
      secondary: '#1e1e1e',
    },
  });

export const errorToast = (message) =>
  toast.error(message, {
    duration: 4000,
    style: {
      background: '#ff4d4f',
      color: '#fff',
    },
  });


export const showImageToast = (base64Image, message = "Operation successful") => {
  toast.custom((t) => (
    <ImageToast base64Image={base64Image} message={message} toastId={t.id} />
  ), {
    duration: 4000,
  });
};