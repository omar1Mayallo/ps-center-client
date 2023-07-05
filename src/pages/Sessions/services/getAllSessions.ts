import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ResErrorsI} from "../../../api";
import {GetAllResI} from "../../../shared/types/APITypes";
import Session from "../../../shared/types/entities/Session";
import useSessionsAPIs from "../api";

export default function useGetAllSessions() {
  const {getAllSessions} = useSessionsAPIs();
  return useQuery<GetAllResI<Session>, AxiosError<ResErrorsI>>({
    queryKey: ["sessions"],
    queryFn: getAllSessions,
  });
}
