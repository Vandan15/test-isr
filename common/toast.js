import toast from 'react-hot-toast';

const toastSuccess = (content, options) => {
  toast?.success(content, options);
};

const toastError = (content, options) => {
  toast?.error(content, options);
};

export { toastError, toastSuccess };
