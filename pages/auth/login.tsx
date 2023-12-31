import React, { useState, FC } from "react";
import ReactModal from "react-modal";
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { X } from 'react-feather';
import styles from "./auth.module.css"
import signIn from "@/firebase/auth/signIn";
import firebase_app from "@/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber, getAuth } from "firebase/auth";
import { login } from "../../store/actions/authAction"

const auth = getAuth(firebase_app);

const inter = Inter({ subsets: ['latin'] })

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
}
const LModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vcode, setVcode] = useState("");
  const [phoneInput, setPhoneInput] = useState(true);
  const [confirmInput, setConfirmInput] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const changePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value)
  }
  const changeConfirmCode = (e: any) => {
    setVcode(e.target.value)
  }

  const onSignInSubmit = async (event: any) => {
    event.preventDefault()

    const phone = "+" + phoneNumber;
    const appVerifier = new RecaptchaVerifier(
      "phone-sign-in-button",
      {
        size: "invisible",
      },
      auth
    );

    return router.push("/home")
  }

  const onSubmitOtp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    confirmationResult
    .confirm(vcode)
    .then((result: { user: any; }) => {
        dispatch(login(true));
        const user = result.user;
        router.push("/home")
      })
      .catch((error: any) => {
        console.log(error);
        setCodeError(true);
      });
  };

  return (
    <>
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Login Modal"
          className={styles.Main}
        >
          <div className={styles.Head}>
            <h1 className={styles.Name}>メールでログイン</h1>
            <X className={styles.CrossButton} onClick={onClose}></X>
          </div>
          {(phoneInput) &&
            <form onSubmit={onSignInSubmit} className={styles.Content}>
              <h1 className={styles.Title}>Enter your phone number</h1>
              <input placeholder="16505551234" type="number" value={phoneNumber} onChange={changePhoneNumber} />
              <button type="submit" id="phone-sign-in-button">Verify</button>
            </form>
          }
          {(confirmInput) &&
            <form onSubmit={onSubmitOtp} className={styles.Content}>
              <h1 className={styles.Title}>Input code.</h1>
              <input placeholder="Code" type="number" value={vcode} onChange={changeConfirmCode} />
              {(codeError) && <p className={styles.Error}>Incorrect code.</p>}
              <button type="submit">次へ</button>
            </form>
          }
        </ReactModal>
      </main>
    </>
  )
}

export default LModal;