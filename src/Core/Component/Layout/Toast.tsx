import React, { PureComponent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends PureComponent<any, any> {
  componentDidMount(): void {
    if (!Object.keys(this.props.socket._callbacks).includes('$new-notification')) {
      // tslint:disable-next-line:only-arrow-functions
      this.props.socket.on('new-notification', function({ payload }: any) {
        toast(`${payload.description}`);
      });
    }
  }

  render() {
    return <ToastContainer />;
  }
}

export default Toast;
