import React from 'react';

class Alarms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Alarm MANAGER'
    };
  }
  componentWillMount() {
    if (!this.props.alarms.initiallyLoaded) {
      this.props.onLoad(this.props.alarms.limit, this.props.alarms.skip);
    }
  }
  render() {
    const alarmCard = this.props.alarms.data.map((alarm, index) => (
      <div className="card-event mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col" key={index}>
        <div className="mdl-card__title mdl-card--expand flex-column">
          <h4>{alarm.title}</h4>
          <div>{alarm.description}</div>
          <div>{alarm.createdAt}</div>
          {alarm.time}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Add to Calendar
          </a>
          <div className="mdl-layout-spacer"></div>
          <i className="material-icons">event</i>
        </div>
      </div>
    ));
    return (
      <div className="mdl-grid">
        {alarmCard}
      </div>
    );
  }
}

export default Alarms;