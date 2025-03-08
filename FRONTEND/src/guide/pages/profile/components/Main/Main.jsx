import React from 'react';
import Styles from './Main.module.scss';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Main = () => {
  return (
    <div className={Styles.main}>
      
      <div className={Styles.sub}>
      <div className={Styles.title}>General Details</div>

      <div className={Styles.name}>

        <div className={Styles.firstname}>
          <span className={Styles.fnamelabel}>First Name</span>
          <input type="text" className={Styles.fnametxt} />
        </div>
        <div className={Styles.lastname}>
          <span className={Styles.snamelabel}>Last Name</span>
          <input type="text" className={Styles.snametxt} />
        </div>
      </div>

      <div className={Styles.email}>
        <span className={Styles.emaillabel}>Email</span>
        <input type="email" className={Styles.emailtxt} />
      </div>

      <div className={Styles.phone}>
        <span className={Styles.phonelabel}>Phone Number</span>
        <input type="tel" className={Styles.phonetxt} />
      </div>

     
      <div className={Styles.update}>
        <button className={Styles.updatebtn}>Update</button>
      </div>
      </div>


      <div className={Styles.images}>
        <div className={Styles.profile}>
          <span className={Styles.photolabel}>Photo</span>
          <label className={Styles.photolabel1}>
          <span className={Styles.photoicon}><UploadFileIcon/>Choose Photo</span>
          <input type='file' className={Styles.file}/>
          </label>
        </div>
        <div className={Styles.proof}>
        
          <span className={Styles.prooflabel}>ID Proof</span>
          <label className={Styles.prooflabel1}>
          <span className={Styles.prooficon}><UploadFileIcon/>Choose ID Proof</span>
          <input type='file' className={Styles.file}/>
</label>
        </div>
          <div className={Styles.update}>
        <button className={Styles.updatebtn}>Update</button>
      </div>
      </div>
    
      <div className={Styles.password}>
        <span className={Styles.title}>Change Password</span>
        <div className={Styles.currentpassword}>
        <span  className={Styles.currentpswdlbel} >Current Password</span>

          <input type='password' className={Styles.currentpswd} />
        </div>
        <div className={Styles.newpassword}>
        <span  className={Styles.newpswdlbel} >New Password</span>
        <input type='password'className={Styles.newpswd} />
        
        
        </div>
          <div className={Styles.update}>
        <button className={Styles.updatebtn}>Update</button>
      </div>
      </div>

    </div>
  );
};

export default Main;
