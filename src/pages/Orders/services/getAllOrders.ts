import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import Order from "../../../shared/types/entities/Order";
import {GetAllResI} from "../../../shared/types/APITypes";
import useOrdersAPIs from "../api";

export default function useGetAllOrders() {
  const {getAllOrders} = useOrdersAPIs();
  return useQuery<GetAllResI<Order>, AxiosError<ResErrorsI>>({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
}
