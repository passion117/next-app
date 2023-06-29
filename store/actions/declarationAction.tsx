import { PIN_SETTING, DETAIL_INFOR_SETTING } from '../types'
export const detailInforSetting = (detailInfor: any) => {
    
    return {
        type: "DETAIL_INFOR_SETTING",
        payload: detailInfor
      }
}
export const toggleModalView = (flag: any) => {
    
    return {
        type: "MODAL_VIEW",
        payload: flag
      }
}