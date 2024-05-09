import styles from "./page.module.scss";
import Slider from "./Components/Slider/Slider";
import Catigory from "./Components/Catigory/Catigory";
import About from "./Components/About/About";
import Advertisme from "./Components/advertism/Advertisme";
import Reviews from "./Components/Reviews/Reviews";



export default async function Home() {
  

  return (
    <main  className={styles.main}>
        <Slider/>
        <section className={styles.content}>
          <section className={styles.About} id="about">
            <Advertisme/> 
            <About/>
            </section>
          <section className="catigories" id="catigories">
            <Catigory/>
          </section>
          <Reviews review="Instructors"/>
      </section>
    </main>
  );
}
