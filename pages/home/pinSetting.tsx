import * as React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { toggleModalView } from "../../store/actions/declarationAction" 
import DetailInforInput from './detailInforInput';
import styles from "./main.module.css";
const PinSetting = (props: any) => {
  
  useEffect(() => {
    setOpen(props.open);
    setPosition(props.position.lat);
  }, [props])

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState('');
  const [showMe, setShowMe] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  const router = useRouter();

  const getToggleValue = () => {
    setIsChecked(document.getElementById('checkbox').checked);
  }
  const savePinInfor = () => {
    // dispatch();
  }
  const goToHome = () => {
    dispatch(toggleModalView(true));
  }
  const detailView = () => {
    setIsDetail(true);
  }
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');

  const settingInfor = {
    location: position,
    date: date,
    // content: content,
    isPublic: isChecked,
  } 
  return (
    <>
      {
        open && !isDetail ? (
        <div className={styles.pinSetting}>
          <div>
            <h1 className={styles.subtitle}>ピンを設定</h1>
            <div>
              <div className={styles.evenRow}>
                <FontAwesomeIcon className={styles.settingIcon} icon={faMapMarkerAlt} />
                <span>{position}</span>
              </div>
              <div className={styles.evenRow}>
                <FontAwesomeIcon className={styles.settingIcon} icon={faClock} />
                <span>{date}</span>
              </div>
              <div className={styles.row}>
                <FontAwesomeIcon className={styles.settingIcon} icon={faCommentDots} />
                <span>詳細（任意）</span>
                <span className={styles.edit} onClick={() => detailView()}>入力</span>
              </div>
              <div className={styles.row}>
                <FontAwesomeIcon className={styles.settingIcon} icon={faEye} />
                <span>ピンを公開する</span>
                <label className={styles.toggle}>
                  <input type="checkbox" id="checkbox" onClick={() => getToggleValue()} />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.setPin} onClick={() => savePinInfor()}>ピンを設置</button>
              <button className={styles.next} onClick={() => goToHome()} >戻る</button>
            </div>
          </div>
        </div>
        ): <DetailInforInput />
      }
    </>
  )
}

export default PinSetting