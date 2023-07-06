import {getData} from "../../../api/APIMethods";
import {OrderTypes} from "../../../shared/types/entities/Order";

// PERCENTAGE_TYPES
export interface SessionTypesPercentageItem {
  DuoPercentage: number;
  MultiPercentage: number;
}
export interface OrderTypesPercentageItem {
  InDevicePercentage: number;
  OutDevicePercentage: number;
}
export interface PercentageResI<T> {
  status: string;
  data: {
    percentage: T[];
  };
}

// MONTHLY_PROFITS_TYPES
export interface OrderTypesProfitItem {
  _id: {
    month: number;
    year: number;
    type: OrderTypes;
  };
  value: number;
}
export interface SessionProfitItem {
  _id: {
    month: number;
    year: number;
  };
  value: number;
}
export interface ProfitsI<T> {
  status: string;
  data: {
    profits: T[];
  };
}

const useDashboardAPIs = () => {
  // GET_ORDERS_MONTHLY_PROFITS
  async function getOrdersMonthlyProfits() {
    const res = await getData<ProfitsI<OrderTypesProfitItem>>(
      "/orders/monthly-profits"
    );
    return res;
  }

  // GET_ORDERS_MONTHLY_PROFITS
  async function getOrderTypesPercentages() {
    const res = await getData<PercentageResI<OrderTypesPercentageItem>>(
      "/orders/types-percentage"
    );
    return res;
  }

  // GET_SESSIONS_MONTHLY_PROFITS
  async function getSessionsMonthlyProfits() {
    const res = await getData<ProfitsI<SessionProfitItem>>(
      "/game-sessions/monthly-profits"
    );
    return res;
  }

  // GET_SESSIONS_TYPES_PERCENTAGES
  async function getSessionsTypesPercentages() {
    const res = await getData<PercentageResI<SessionTypesPercentageItem>>(
      "/game-sessions/session-types-percentage"
    );
    return res;
  }

  return {
    getOrdersMonthlyProfits,
    getSessionsMonthlyProfits,
    getSessionsTypesPercentages,
    getOrderTypesPercentages,
  };
};

export default useDashboardAPIs;
