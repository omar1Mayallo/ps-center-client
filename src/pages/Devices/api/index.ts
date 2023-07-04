import {getData} from "../../../api/APIMethods";
import {GetAllResI} from "../../../shared/types/APITypes";
import Device from "../../../shared/types/entities/Device";

const useDevicesAPIs = () => {
  // GET_ALL_DEVICES
  async function getAllDevices() {
    const res = await getData<GetAllResI<Device>>("/devices?sort=+isEmpty");
    return res;
  }

  return {getAllDevices};
};

export default useDevicesAPIs;
