import React from "react";
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from "next/router";
import Navbar from '@/components/layouts/navbar';
import Map from '../../components/map';
import Toolbar from "@/components/toolbar";
import MapControlBtn from "@/components/map/controlBtn";

const inter = Inter({ subsets: ['latin'] })

type Props = {
  title: string;
};
const Home: NextPage<Props> = ({ title }) => {

  const router = useRouter();

  return (
    <div>
      <Navbar />
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
          <Map />
          <MapControlBtn />
        <Toolbar />
      </main>
    </div>
  )
}

export default Home;