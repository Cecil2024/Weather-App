import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      
      <h1>Weather App</h1>
      <p>Select city</p>
      <fieldset></fieldset>

      <button>Send</button>
    </div>
  );
}
