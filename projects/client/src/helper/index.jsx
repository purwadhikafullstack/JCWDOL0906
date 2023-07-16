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
    currency: "IDR"
  }).format(number);
}

export const formatDate = (date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sept", "Okt", "Nov", "Des"
  ];


  const month = monthNames[mm];

  const formattedToday = dd + '/' + month;
  return formattedToday
}

export const time = (date) => {
  const today = new Date(date);

  const addTwo = new Date(today.getTime() + (2 * 60 * 60 * 1000))
  const hours = addTwo.getHours()
  const minutes = addTwo.getMinutes()
  const time = hours + ':' + minutes;
  return time
}
