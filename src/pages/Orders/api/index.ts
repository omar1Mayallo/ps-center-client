import {enqueueSnackbar} from "notistack";
import {deleteData, getData} from "../../../api/APIMethods";
import Order from "../../../shared/types/entities/Order";
import {GetAllResI, GetOneResI} from "../../../shared/types/APITypes";
import {useNavigate} from "react-router-dom";

const useOrdersAPIs = () => {
  const navigate = useNavigate();
  // GET_ALL_ORDERS
  async function getAllOrders() {
    const res = await getData<GetAllResI<Order>>("/orders");
    return res;
  }

  // GET_ORDERS
  async function getOrder(id: string) {
    const res = await getData<GetOneResI<Order>>(`/orders/${id}`);
    return res;
  }

  // DELETE_ORDERS
  async function deleteOrder(id: string) {
    const res = await deleteData(`/orders/${id}`);
    if (res.status === 204) {
      enqueueSnackbar("Successfully deleted", {variant: "success"});
      navigate("/orders");
    }
  }

  // DELETE_ALL_ORDERS
  async function deleteAllOrders() {
    const res = await deleteData(`/orders`);
    if (res.status === 204)
      enqueueSnackbar("Successfully deleted all orders", {variant: "success"});
  }

  return {getAllOrders, getOrder, deleteOrder, deleteAllOrders};
};

export default useOrdersAPIs;
