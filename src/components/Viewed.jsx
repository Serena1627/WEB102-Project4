import PropTypes from "prop-types";
export const Viewed = (props) => {
  console.log(props.viewed);
  return (
    <div className="viewed">
      <h2>Viewed</h2>
      <div>
        {props.viewed && props.viewed.map((item, key) => {
          console.log(item);
          return (
            <div key={key}>
              <img src={true && item.url} width={"10%"} alt="dog" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Viewed.propTypes = {
  viewed: PropTypes.array,
};
Viewed.defaultProps = {
  viewed: [],
};