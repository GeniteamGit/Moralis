
import React from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

/**
 * 
 * @param type
 * info success warning error
 * @param message
 * @param title
 * @returns 
 */

export function Notification(props) {
    const {type, message, title} = props;
    console.log(props);
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info( message ? message : 'Info message',title ? title :'', 5000);
          break;
        case 'success':
          NotificationManager.success( message ? message :'Success message', title ? title :'', 5000);
          break;
        case 'warning':
          NotificationManager.warning(message ? message :'Warning message', title ? title :'', 5000);
          break;
        case 'error':
          NotificationManager.error(message ? message :'Error message', title ? title :'', 5000 );
          break;
      }
    };
  };

    return (
      <div>
        <button className={ type==="error"? `btn btn-danger`: `btn btn-${type}`}
          onClick={createNotification(type)}>Info
        </button>
        <NotificationContainer/>
      </div>
    );

}

export default Notification;