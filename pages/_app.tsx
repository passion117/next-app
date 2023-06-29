import React from 'react'
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import type { AppProps } from "next/app";
import { wrapper } from "../store";

const isAuthenticated = Cookies.get("token");

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {

    if(isAuthenticated !== "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"){
      router.push('/admin');
    }
    }, [isAuthenticated]);

    const router = useRouter()

  return (
      <Component {...pageProps} />
  );
};

export default wrapper.withRedux(App);

