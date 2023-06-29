import * as React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from "./setting.module.css";
import { useRouter } from "next/router";
import NationwideModal from './nationWideModal';
import DetailInforInput from '../home/detailInforInput';
const PinSetting = (props: any) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    setOpen(props.open)
  }, [props])

  const [isOpenModal, setIsOpenModal] = useState(false);
  
  const handleClick = () => {
    setIsOpenModal(!isOpenModal)
  }

  const [isOpenNationModal, setIsOpenNationModal] = useState(false);
  const handleOpenNaitonModal = () => setIsOpenNationModal(true);
  const handleCloseNationModal = () => setIsOpenNationModal(false);

  const router = useRouter();

  const getToggleValue = () => {
    var isChecked = document.getElementById('checkbox').checked;
  }

  return (
    <>
      {
        <div className={styles.pinSetting}>
          <div>
            <h1>設定したエリアにピンが立った時に通知が届きます</h1>
            <div>
              <div className={styles.allarea} onClick={() => handleOpenNaitonModal()}>
                <span>全国</span>
                <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              </div>
              <NationwideModal isOpen={isOpenNationModal} onClose={() => console.log('here')}/>
              <div className={styles.detail} onClick={() => handleClick()}>
                <span>詳細</span>
                <FontAwesomeIcon className={styles.icon} icon={faCaretDown} />
              </div>
              <div className={styles.notice}>
                <span>通知</span>
                <label className={styles.toggle}>
                  <input type="checkbox" id="checkbox" onClick={() => getToggleValue()} />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <button className={styles.reset}>設定をリセットする</button>
            </div>
            {isOpenModal && (
              <DetailInforInput onClose={() => handleClick()} />
            )}
            <div className={styles.btn}>
              <button className={styles.addHome}>ホーム画面に追加</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PinSetting