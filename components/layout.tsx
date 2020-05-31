import React from "react";
import styles from "./layout.module.scss";

export default (props: { children: React.ReactNode }) => (
  <main className={styles.container}>{props.children}</main>
);
