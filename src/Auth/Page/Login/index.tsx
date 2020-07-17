import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LayoutWrapper from 'Core/Component/Layout/Wrapper';
import LayoutTitle from 'Core/Component/Layout/Title';
import AuthComponentLogin from 'Auth/Component/Login';
import { login } from 'Auth/Store/actions';
import { GlobalState } from 'Core/types';

class Login extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onLoginSubmitted = this.onLoginSubmitted.bind(this);
  }

  onLoginSubmitted(data: {
    email: string,
    password: string,
  }) {
    this.props.login(data);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={'/'} />;
    }

    return (
      <LayoutWrapper medium={4}>
        <LayoutTitle>Login</LayoutTitle>
        <section>
          <AuthComponentLogin onSubmit={this.onLoginSubmitted} />
        </section>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = (state: GlobalState): {
  isAuthenticated: boolean,
} => {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: any): object => {
  return {
    login: (user: any) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
