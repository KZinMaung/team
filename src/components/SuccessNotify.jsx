import { toast } from "react-toastify";

const successNotify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  export default successNotify;