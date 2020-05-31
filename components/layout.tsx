import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";

export default (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>U.S. National Park - Park Status</title>
    </Head>
    <main className={styles.container}>{props.children}</main>
    <footer>
      <p>Created by Sherman Hewitt</p>
      <p>Data comes from the U.S. National Park Service</p>
    </footer>
  </>
);
