import * as React from 'react';
import { useState } from 'react';
import { useRouter } from "next/router";
import {
  ref,
  uploadBytesResumable 
} from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styles from "./nice.module.css";

const Recommend = (props: any) => {

  const [imageFile, setImageFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState("/user.svg");

const photoUpload = (e: any) =>{
  e.preventDefault();
  const reader = new FileReader();
  const file = e.target.files[0];
  reader.onloadend = () => {
    setImageFile(file);
    setImagePreviewUrl(reader.result);
  }
  reader.readAsDataURL(file);
}
  const getUserProfile = (photoUpload: any) => {
    return (
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <FontAwesomeIcon className={styles.icon} icon={faCamera} />
          <img for="photo-upload" src={imagePreviewUrl} className={styles.avatar}/>
        </div>
        <input id="photo-upload" className={styles.photo_upload} type="file" onChange={photoUpload}/> 
      </label>
    )
  }

  return (
    <>
      {
        <div className={styles.nice}>
          <div className={styles.imageUpload}>
            <div className={styles.user}>
              {getUserProfile(photoUpload)}
            </div>
            <div className={styles.userName}>
              <label>ニックネーム</label>
              <input type="text" placeholder="ダイキ" />
            </div>

            <div className={styles.dashline}>
            </div>

            <div className={styles.niceHistory}>
              <p>ナイス！　履歴</p>

              <div>
                <span className={styles.date}>2023/10/11
                </span>
                <span className={styles.time}>12:35
                </span>
                <span className={styles.name}>ヤマダ
                </span>
                <span className={styles.location}>鹿児島県鹿児島市真砂町54-3
                </span>
              </div>
            </div>
            <div className={styles.btnContain}>

              <div className={styles.btn}>
                <p>ナイス！　通知</p>
                <label className={styles.toggle}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Recommend