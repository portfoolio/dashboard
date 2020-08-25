import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import { connect } from 'react-redux';
import { ActionType } from 'modules/Core/Store/types';
import { uuid4 } from 'util/helper';

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
              const id = uuid4();

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
