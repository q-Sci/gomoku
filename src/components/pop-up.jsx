const PopUp = ({ color, message, onClose }) => {
  return (
    <p className={`pop-up pop-up-${color}`}>
      {message}
      <button onClick={() => onClose()}>×</button>
    </p>
  );
};
export default PopUp;
