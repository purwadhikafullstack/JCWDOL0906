import Swal from "sweetalert2";

export const swalSuccess = (message) => {
  return Swal.fire({
    icon: "success",
    title: "",
    text: message,
  });
};

export const swalFailed = (message) => {
  return Swal.fire({
    icon: "error",
    title: "",
    text: message,
  });
};

export const clearForm = (elementId) => {
  elementId.map((i) => {
    return (document.getElementById(i).value = "");
  });
};
