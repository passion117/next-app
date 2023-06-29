import { combineReducers } from "redux";
import auth from "./authReducer";
import declarationInfor from "./declarationReducer";

export default combineReducers({
    auth: auth, 
		declarationInfor: declarationInfor, 
	});