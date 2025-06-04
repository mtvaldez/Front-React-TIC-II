import { toast } from 'react-hot-toast';

export const successToast = (message) =>
  toast.success(message, {
    duration: 4000,
    // position: 'top-right',
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
