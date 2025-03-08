import React, { useState } from 'react';
import Styles from './Main.module.scss';

const Main = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(false);

  const toggleHandler = (stateSetter, currentState) => {
    stateSetter(!currentState);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.sub}>
      <span className={Styles.heading}>Notification Settings</span>

      <div className={Styles.setting}>
        <div className={Styles.option}>
          <span className={Styles.label}>Enable Notifications</span>
          <div
            className={`${Styles.toggle} ${notificationsEnabled ? Styles.active : ''}`}
            onClick={() => toggleHandler(setNotificationsEnabled, notificationsEnabled)}
          >
            <div className={Styles.toggleCircle}></div>
          </div>
        </div>
      </div>

      <div className={Styles.setting}>
        <div className={Styles.option}>
          <span className={Styles.label}>Email Notifications</span>
          <div
            className={`${Styles.toggle} ${emailNotifications ? Styles.active : ''}`}
            onClick={() => toggleHandler(setEmailNotifications, emailNotifications)}
          >
            <div className={Styles.toggleCircle}></div>
          </div>
        </div>
      </div>

      <div className={Styles.setting}>
        <div className={Styles.option}>
          <span className={Styles.label}>Sound Alerts</span>
          <div
            className={`${Styles.toggle} ${soundAlerts ? Styles.active : ''}`}
            onClick={() => toggleHandler(setSoundAlerts, soundAlerts)}
          >
            <div className={Styles.toggleCircle}></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Main;
