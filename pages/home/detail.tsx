import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layouts/navbar';
import Map from '../../components/map';
import Toolbar from "@/components/toolbar";
import DetailInforInput from "./detailInforInput";

const inter = Inter({ subsets: ['latin'] })

type Props = {
  title: string;
};

const Detail: NextPage<Props> = ({ title }) => {

  return (
    <div>
      <Navbar />
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <Map />
        <DetailInforInput />
        <Toolbar />
      </main>
    </div>
  )
}

export default Detail;