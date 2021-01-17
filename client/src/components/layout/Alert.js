import { removeAlert } from '../../store/actions/alert';
import useStore from '../../hooks/useStore';

function Alert() {
  const [{ alerts }, dispatch] = useStore();

  return (
    alerts &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <span>{alert.msg}</span>
        <span
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => dispatch(removeAlert(alert.id))}
        >
          X
        </span>
      </div>
    ))
  );
}

export default Alert;
