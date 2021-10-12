import {
    GET_MORE_PARK_LIST,
    GET_PARK_LIST, GET_PARK_LIST_ERROR,
    LOADING_START,
    TOGGLE_LIKE
} from "../../actionTypes/ParkActionType";
import { IParkReducer } from "../../interface/ParkReducerInterface";
import { IAction } from "../../../common/interface/redux/ActionInterface";
import { initialProductState } from "./InitialProductReducer";


export const parkReducer = (state: IParkReducer = initialProductState, action: IAction) => {
    switch (action.type) {
        case LOADING_START:
            return {
                ...state,
                parkList: {
                    ...state.parkList,
                    loading: true
                }
            }
        case GET_PARK_LIST:
            action.payload.data.forEach((park: any) => {
                park.like = false;
            })
            return {
                ...state,
                parkList: {
                    ...state.parkList,
                    ...action.payload,
                    loading: false,
                    error: ''
                }
            }
        case GET_PARK_LIST_ERROR:
            return {
                ...state,
                parkList: {
                    ...state.parkList,
                    error: action.payload,
                    loading: false,
                }
            }
        case GET_MORE_PARK_LIST:
            action.payload.data.forEach((park: any) => {
                park.like = false;
            })
            return {
                ...state,
                parkList: {
                    ...state.parkList,
                    ...action.payload,
                    data: state.parkList?.data.concat(action.payload.data),
                    loading: false,
                    error: '',
                }
            }
        case TOGGLE_LIKE:
            return {
                ...state,
                parkList: {
                    ...state.parkList,
                    data: state.parkList?.data.map((park: any) => {
                        if (park.parkCode === action.payload) {
                            park.like = !park.like
                        }
                        return park;
                    })
                }
            }
        default:
            return { ...state };
    }
}

export default parkReducer;
