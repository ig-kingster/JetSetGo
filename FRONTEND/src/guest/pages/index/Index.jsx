import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

import Styles from './Index.module.scss'
import Trendingspot from '../../components/trendingspots/Trendingspot'
import TopPackage from '../../components/toppackage/TopPackage'
import Banner from '../../components/banner/Banner'
import Testimonials from '../../components/testimonials/Testimonials'



const Index = () => {
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
  )
}

export default Index