"use client";
import Head from "next/head";
import { type PropsWithChildren } from "react";
import { Header } from "./header.component";

export const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-5 py-3">
      <Head>
        <title>for.notes</title>
      </Head>
      <Header />
      {children}
    </div>
  );
};
