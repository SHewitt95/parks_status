import styles from "./layout.module.css";

export default (props) => (
  <main className={styles.container}>{props.children}</main>
);
