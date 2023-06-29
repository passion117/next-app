import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layouts/navbar';
import Map from '../../components/map';
import Nice from "./nice"
import Toolbar from "@/components/toolbar";


const inter = Inter({ subsets: ['latin'] })

type Props = {
  title: string;
};

const Recommend: NextPage<Props> = ({ title }) => {

  return (
    <div>
      <Navbar />
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <Map />
        <Nice />
        <Toolbar />
      </main>
    </div>
  )
}

export default Recommend;