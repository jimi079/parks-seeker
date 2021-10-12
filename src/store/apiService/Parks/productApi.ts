import * as apiService from "../index";
import {IData} from "../../../common/interface/ICommon";

/**
 * Get order data
 */
export const getParkListing = (data: IData) => {
    let apiCall = `parks`;
    if (data) {
        if (data.parkCode) {
            data.parkCode.forEach((code: string) => code.trim())
            apiCall+= `?parkCode=${data.parkCode.toString()}`
        }
        if (data.stateCode) {
            data.stateCode.forEach((code: string) => code.trim())
            apiCall+= `?stateCode=${data.stateCode.toString()}`
        }
        if (data.start) {
            apiCall+= `?start=${data.start}`
        }
    }
    return apiService.get(apiCall);
};
