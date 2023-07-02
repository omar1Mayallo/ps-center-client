import {enqueueSnackbar} from "notistack";
import {deleteData, getData, putData} from "../../../api/APIMethods";
import Snack from "../../../entities/Snack";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import {EditSnackFormData} from "../validation/useEditSnackFormData";

const useSnacksAPIs = () => {
  // GET_ALL_SNACKS
  async function getAllSnacks() {
    const res = await getData<GetAllResI<Snack>>("/snacks");
    return res;
  }

  // GET_SNACK
  async function getSnack(id: string) {
    const res = await getData<GetOneResI<Snack>>(`/snacks/${id}`);
    return res;
  }

  // DELETE_SNACK
  async function deleteSnack(id: string) {
    const res = await deleteData(`/snacks/${id}`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted", {variant: "success"});
  }

  // EDIT_SNACK
  async function editSnack(id: string, data: EditSnackFormData) {
    const res = await putData(`/snacks/${id}`, data);
    if (res.status === 200)
      enqueueSnackbar("Successfully Edited", {variant: "success"});
  }

  return {getAllSnacks, deleteSnack, editSnack, getSnack};
};

export default useSnacksAPIs;
