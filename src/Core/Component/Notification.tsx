/* tslint:disable */
import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import { connect } from 'react-redux';
import { ActionType } from './../Store/types';

class Notification extends Component<any, any> {
  state = {
    notifications: [],
  };

  componentWillReceiveProps(props: any) {
    this.setState({
      notifications: props.notifications,
    });
  }

  handleDismiss = () => {
    this.setState((prevState: any) => ({
      notifications: prevState.notifications.slice(1),
    }));

    this.props.removeNotification();
  }

  render() {
    return (
      <div>
        {
          <FlagGroup onDismissed={this.handleDismiss}>
            {this.state.notifications.map((flag: any) => {
              const id = (() => {
                // eslint-disable-next-line
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
                  // eslint-disable-next-line
                  const r = Math.random() * 16 | 0;
                  // eslint-disable-next-line
                  const v = c == 'x' ? r : (r & 0x3 | 0x8);
                  return v.toString(16);
                });
              })();

              return (
                <AutoDismissFlag
                  appearance={'success'}
                  id={id}
                  icon={
                    <SuccessIcon
                      label={'Success'}
                      size={'medium'}
                      secondaryColor={colors.G400}
                    />
                  }
                  key={id}
                  title={'Success!'}
                  description={flag}
                />
              );
            })}
          </FlagGroup>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ core: { notifications } }: any) => {
  return {
    notifications,
  };
};

const mapDispatchToProps = (dispatch: any): object => {
  return {
    removeNotification: () => dispatch({ type: ActionType.REMOVE_NOTIFICATION }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
