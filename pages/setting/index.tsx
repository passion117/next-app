import { useState } from "react";
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layouts/navbar';
import Map from '../../components/map';
import Settings from "./pinSetting";
import styles from "./settings.module.css";
import Toolbar from "@/components/toolbar";

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
        <Settings />
        <Toolbar />
      </main>
    </div>
  )
}

export default Home;