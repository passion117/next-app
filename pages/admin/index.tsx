import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layouts/navbar';
import LPModal from '../auth/loginWithPhone';
import SPModal from '../auth/signUpWithPhone';
import styles from "../../styles/home.module.css";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

type Props = {
  title: string;
};

const Landing: NextPage<Props> = ({ title }) => {

  const router = useRouter();

  const config = {
    file: {
      attributes: {
        style: {
          objectFit: "cover",
          width: "100%",
          height: "100%"
        },
      },
    },
  };

  const [isLPOpen, setIsLPOpen] = useState(false);
  const [isSPOpen, setIsSPOpen] = useState(false);

  const handleOpenLPModal = () => {
    setIsLPOpen(true);
  }; 
  const handleOpenSPModal = () => setIsSPOpen(true);
  const handleCloseLPModal = () => setIsLPOpen(false);
  const handleCloseSPModal = () => setIsSPOpen(false);

  return (

    <div>
      <Navbar />
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <div>
          <div className={styles.video}>
            <ReactPlayer width="100%" height="100%" url='/video/LP用動画 511.MOV' config={config} playing={true} loop={true} muted />
          </div>
          <div className={styles.btn}>
            <div>
              <button className={styles.signUpBtn} onClick={handleOpenSPModal}>無料で始める</button>
              <SPModal isOpen={isSPOpen} onClose={handleCloseSPModal} />

              <button className={styles.loginBtn} onClick={handleOpenLPModal}>ログイン</button>
              <LPModal isOpen={isLPOpen} onClose={handleCloseLPModal} />
              <h1 className={styles.footerTitle}>ホーム画面に追加</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing;