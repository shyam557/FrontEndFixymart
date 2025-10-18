import { toast, ToastContainer } from "react-toastify";
export const handleSuccess = (msg, onClose) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-green-500 text-white rounded shadow-md px-4 py-3',
        progressClassName: 'bg-green-700',
        onClose,
    });
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 2000,
        className: 'bg-red-500 text-white rounded shadow-md px-4 py-3',
        progressClassName: 'bg-red-700',
    });
}

export const ToastContainerCustom = () => (
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
    />
);