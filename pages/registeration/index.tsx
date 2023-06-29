import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layouts/navbar';
import Registeration from './registeration';
import styles from './registeration.module.css';
import Toolbar from "@/components/toolbar";
import Map from '@/components/map';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  title: string;
};

const Home: NextPage<Props> = ({ title }) => {
  return (

    <div>
      <Navbar />
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <Map />
        <Registeration />
        <Toolbar />
      </main>
    </div>
  )
}

export default Home;