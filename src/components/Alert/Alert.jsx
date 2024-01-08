import './Alert.css';
import PropTypes from 'prop-types';


const Alert = ({ message, type }) => {
  const alertClassName = `alert ${type}`;

  return (
    <div className={alertClassName}>
      {message}
    </div>
  );
};

export default Alert;

Alert.propTypes ={
    message: PropTypes.string,
    type: PropTypes.string,
}