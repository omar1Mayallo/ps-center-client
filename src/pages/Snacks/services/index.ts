import {enqueueSnackbar} from "notistack";
import {deleteData, getData} from "../../../api/APIMethods";
import Snack from "../../../entities/Snack";
import {GetAllResI} from "../../../shared/types/APITypes";

const useSnacksServices = () => {
  // GET_ALL_SNACKS
  async function getAllSnacks() {
    const res = await getData<GetAllResI<Snack>>("/snacks");
    return res;
  }

  async function deleteSnack(id: string) {
    const res = await deleteData(`/snacks/${id}`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted", {variant: "success"});
  }

  return {getAllSnacks, deleteSnack};
};

export default useSnacksServices;
