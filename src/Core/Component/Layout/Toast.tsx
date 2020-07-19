import React, { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends PureComponent<any, any> {
  render() {
    return <ToastContainer />;
  }
}

export default Toast;
