import { DECLARATION, DETAIL_INFOR_SETTING, PIN_SETTING, MODAL_VIEW } from "../types";
import { DeclarationInfor } from '../states/declarationStates'
import { HYDRATE } from "next-redux-wrapper";
import * as action from '../actions/declarationAction'

const initialState: DeclarationInfor = {
    declarationer: '',
    time: '',
    detailInfor: {},
    isPublic: '',
    isDetailView: false,
    isPinSettingView: false,
};
export default (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case DECLARATION:
      return {
        ...state,
        data: action.payload
      }
    case PIN_SETTING:
      return {
        ...state,
        data: action.payload
      }
    case MODAL_VIEW:
      return {
        ...state,
        data: action.payload
      }
    case DETAIL_INFOR_SETTING:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
    }
  }