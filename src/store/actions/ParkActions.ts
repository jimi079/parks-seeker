import {
    LOADING_START,
    GET_PARK_LIST,
    GET_MORE_PARK_LIST,
    TOGGLE_LIKE,
    GET_PARK_LIST_ERROR
} from "../actionTypes/ParkActionType";
import { getParkListing } from "../apiService/Parks/productApi";
import { IData } from "../../common/interface/ICommon";
import { IPark } from "../interface/ParkReducerInterface";

/**
 * get parks list action
 * @param data
 */
export const getParkListAction = (data?: IData) => {
    return (dispatch: any) => {
        dispatch({ type: LOADING_START })
        getParkListing({...data}).then((res: any) => {
                if (res) {
                    dispatch({
                        type: GET_PARK_LIST,
                        payload: res
                    });
                }
            })
            .catch((err: Error) => {
                dispatch({
                    type: GET_PARK_LIST_ERROR,
                    payload: err.message
                });
            });
    };
};

export const getMoreParkListAction = (data: IData) => {
    return (dispatch: any) => {
        dispatch({ type: LOADING_START })
        getParkListing(data)
            .then((res: any) => {
                if (res) {
                    let start: string = data.start ? data.start : '';
                    res.limit = (+start + 50).toString();
                    dispatch({
                        type: GET_MORE_PARK_LIST,
                        payload: res
                    });
                }
            })
            .catch((err: Error) => {
                dispatch({
                    type: GET_PARK_LIST_ERROR,
                    payload: err.message
                });
            });
    };
}

export const toggleParkLike = (park: IPark) => {
    return (dispatch: any) => {
        dispatch({
            type: TOGGLE_LIKE,
            payload: park.parkCode
        });
    };
}
