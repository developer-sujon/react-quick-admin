import ToastMessage from "../ToastMessage";

export const handleBackendError = (error, setError) => {
  if (
    error?.error?.data.code === 400 &&
    Array.isArray(error?.error?.data?.data)
  ) {
    error.error.data.data.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item?.message,
      });
    });
    ToastMessage.errorMessage(error.error.data.error);
  }
  if (
    error?.error?.status !== 400 ||
    !Array.isArray(error?.error?.data?.data)
  ) {
    ToastMessage.errorMessage(
      error?.data?.message || error?.error?.data?.message
    );
  }
};
