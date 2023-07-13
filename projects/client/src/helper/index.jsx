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

export const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
