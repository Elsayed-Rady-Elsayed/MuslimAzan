import "./card.css";
const Card = ({ name, time }) => {
  return (
    <div className="card">
      <p className="name">{name}</p>
      <p className="time">{time}</p>
    </div>
  );
};

export default Card;
