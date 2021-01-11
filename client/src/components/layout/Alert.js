import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeAlert } from '../../store/actions/alert';

function Alert({ alerts, removeAlert }) {
  return (
    alerts &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <span>{alert.msg}</span>
        <span
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => removeAlert(alert.id)}
        >
          X
        </span>
      </div>
    ))
  );
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapState = state => ({
  alerts: state.alerts,
});

export default connect(mapState, { removeAlert })(Alert);
