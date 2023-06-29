import {enqueueSnackbar} from "notistack";
import {ResErrorsI} from "../../api";
import {AxiosError} from "axios";

export default function catchAndNotifyErrors(error: AxiosError<ResErrorsI>) {
  const errMsg = error?.response?.data;
  if (errMsg?.message) {
    enqueueSnackbar(errMsg?.message, {variant: "error"});
  }
}
