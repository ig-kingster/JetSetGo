// import React from 'react'
// import Navbar from '../../components/navbar/Navbar'
// import Banner from './components/banner/Banner'
// import TopPackage from './components/toppackage/TopPackage'
// import Trendingspot from './components/trendingspots/Trendingspot'
// import Footer from './components/footer/Footer'
// import Styles from './Home.module.scss'
// import Testimonials from './components/testimonials/Testimonials'
// const Home = () => {
//   return (
//     <div>
//         <Navbar />
//         <Banner/>
//         <Trendingspot/>
//         <TopPackage/>
//         <Testimonials/>
//         <Footer/>
    
//     </div>
//   )
// }

// export default Home
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from './components/banner/Banner'
import TopPackage from './components/toppackage/TopPackage'
import Trendingspot from './components/trendingspots/Trendingspot'
import Footer from './components/footer/Footer'
import Styles from './Home.module.scss'
import Testimonials from './components/testimonials/Testimonials'

const Home = () => {
  return (
    <div className={Styles.container}>
      {/* Navbar would be imported here */}
      <Navbar/>
      <main className={Styles.mainContent}>
        <Banner />
        <section className={Styles.trendingSection}>
          <Trendingspot />
        </section>
        <section className={Styles.packagesSection}>
          <TopPackage />
        </section>

      

        <section className={Styles.testimonialsSection}>
          <Testimonials />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;