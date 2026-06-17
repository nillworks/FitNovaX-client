import { toast } from 'sonner';

const CustomToast = ({ data, error, title, description }) => {
  if (data) {
    toast.success(title, {
      description,
    });
  }
  if (error) {
    toast.error(title, {
      description,
    });
  }
};

export default CustomToast;
