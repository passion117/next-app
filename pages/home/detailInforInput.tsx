import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@/components/textField';
import styles from "../home/main.module.css";
import { detailInforSetting } from "../../store/actions/declarationAction";
const DetailInforInput = (props: any) => {

  const dispatch = useDispatch();
  
  const [textValue, setTextValue] = useState("");
  const isDetailViewInStore = useSelector(state => state.isDetailView);
  const [isDetailView, setIsDetailView] = useState(isDetailViewInStore);

  const handleChange = (e: any): void => {
    setTextValue(e.target.value)
  }
  const data = {
    textValue: textValue,
    isDetailView: isDetailView,
  }
  const setDetailContent = () => {
    setIsDetailView(true);
    dispatch(detailInforSetting(data));
  }
  return (
    <>
    {
      !isDetailView ?  ( 
      <div className={styles.DetailInforInput}>
        <div>
          <div className={styles.ModalHead}>
            <h1 className={styles.ModalName}>詳細 (車両のナンバーなどの個人情報は入力しないでください)</h1>
          </div>
          <div>
            <TextField
              multiline
              value={textValue}
              characterCount
              maxLength={50}
              id="modal-text-field"
              onChange={handleChange}
            />
          </div>
          <div className={styles.Content}>
            <button onClick={() => setDetailContent()}>完了</button>
          </div>
        </div>
      </div>
      ): null
    }
    </>
  )
}

export default DetailInforInput;