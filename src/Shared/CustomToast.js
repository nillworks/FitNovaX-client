import { toast } from 'sonner';

const CustomToast = (type, title, description) => {
  if (type === 'success') {
    toast.success(title, {
      description,
    });
  }

  if (type === 'error') {
    toast.error(title, {
      description,
    });
  }
};

export default CustomToast;
