import React, { Component } from 'react';

interface Props {
  initialValue?: string;
  initialIsOpen?: boolean;
  children: (value: {
    value: string;
    onValueChange: (value: string) => void;
    isOpen: boolean;
    onBlur: () => void;
  }) => React.ReactNode;
}

interface State {
  value: string;
  isOpen: boolean;
}

export class DateTimeControlled extends Component<Props, State> {
  state: State;

  recentlySelected: boolean = false;
  recSelTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initialValue || '',
      isOpen: props.initialIsOpen || false,
    };
  }

  componentWillUnmount() {
    if (this.recSelTimeoutId != null) {
      clearTimeout(this.recSelTimeoutId);
      this.recSelTimeoutId = null;
    }
  }

  handleClick = () => {
    if (!this.recentlySelected) {
      this.setState({ isOpen: true });
    }
  }

  onValueChange = (value: string) => {
    this.recentlySelected = true;
    this.setState(
      {
        value,
        isOpen: false,
      },
      () => {
        this.recSelTimeoutId = window.setTimeout(() => {
          this.recSelTimeoutId = null;
          this.recentlySelected = false;
        }, 200);
      },
    );
  }

  onBlur = () => {
    this.setState({
      isOpen: false,
    });
  }

  onFocus = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.children({
          value: this.state.value,
          onValueChange: this.onValueChange,
          isOpen: this.state.isOpen,
          onBlur: this.onBlur,
        })}
      </div>
    );
  }
}
