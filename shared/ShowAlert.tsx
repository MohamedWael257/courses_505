import Swal from "sweetalert2";
import type { SweetAlertIcon } from "sweetalert2";

function showAlert(
  t: (key: string) => string,
  title?: string,
  textInputLabel?: string,
  inputField?: boolean,
  confirmBtnText?: string,
  showCancel?: boolean,
  type?: SweetAlertIcon,
  action?: any
): Promise<string | null> {
  return new Promise((resolve) => {
    if (!inputField) {
      Swal.fire({
        title: title,
        text: textInputLabel,
        icon: type,
        showCancelButton: showCancel,
        showCloseButton: true, // Show close button

        confirmButtonText: confirmBtnText || t("BUTTONS.confirm"),
        cancelButtonText: t("BUTTONS.noKeepMe"),
        customClass: {
          popup: "custom-popup-class",
          title: "custom-title-class",
        },
        padding: "1rem",
      }).then((result) => {
        if (result.isConfirmed) {
          if (action) action(); // ✅ Execute action if confirmed
          resolve("confirmed"); // ✅ No value to return, resolve with "confirmed"
        } else {
          resolve(null); // ✅ Cancelled case
        }
      });
    } else {
      Swal.fire({
        title: title,
        input: "text",
        inputLabel: textInputLabel,
        confirmButtonText: confirmBtnText || t("BUTTONS.confirm"),
        inputPlaceholder: t("placeholders.enterText"), // ✅ Use translation for placeholder
        showCancelButton: showCancel,
        cancelButtonText: t("BUTTONS.cancel"),
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          resolve(result.value); // ✅ Return user input
        } else {
          resolve(null); // ✅ Cancelled case
        }
      });
    }
  });
}

export default showAlert;
