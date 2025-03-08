import React from 'react'
import Styles from './Info.module.scss'
const Info = () => {
  return (
    <div className={Styles.main}>
      <div className={Styles.login}>
        <div className={Styles.title}>
          <span>User Details</span>
        </div>
        <div className={Styles.name}>
          <span>Name:</span>
          <span>User</span>
        </div>
        <div className={Styles.email}>
          <span>Email</span>
          <span>123@gmail.com</span>
        </div>
      </div>
    <div className={Styles.paymentPage}>
      <div className={Styles.paymentContainer}>
        <h2 className={Styles.paymentTitle}>Price Details</h2>

        <div className={Styles.priceDetails}>
          <div className={Styles.priceItem}>
            <span className={Styles.label}>Price (Items)</span>
            <span className={Styles.value}>₹2,999</span>
          </div>
        

        </div>

        <div className={Styles.totalPayable}>
          <span className={Styles.label}>Total Payable</span>
          <span className={Styles.value}>₹2,549</span>
        </div>

        <h3 className={Styles.sectionTitle}>UPI Payment</h3>
        <div className={Styles.upiDetails}>
          <label className={Styles.upiLabel}>Enter UPI ID</label>
          <input
            type="text"
            placeholder="example@upi"
            className={Styles.upiInput}
          />
        </div>

        <button className={Styles.payButton}>
          Proceed to Pay ₹2,549
        </button>

      </div>
    </div>
    </div>
  )
}

export default Info