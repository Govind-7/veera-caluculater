import "./index.css";

const UserCard = (props) => {
  const { data } = props;

  return (
    <div className="userCard-bg">
      <h2>Name : {data.name}</h2>
      <p>
        <b>Age</b> : {data.age}
      </p>
      {data.country && (
        <p>
          {" "}
          <b>Country</b> : {data.country}
        </p>
      )}
      {data.city && (
        <p>
          {" "}
          <b>City</b> : {data.city}
        </p>
      )}
      {data.mobile && (
        <p>
          {" "}
          <b>Mobile</b> : {data.mobile}
        </p>
      )}
      {data.customerId && (
        <p>
          <b>CustomerId</b> : {data.customerId}
        </p>
      )}
      {data.phone && (
        <p>
          <b>Phone</b> : {data.phone}
        </p>
      )}
      {data.email && (
        <p>
          {" "}
          <b>Email</b> : {data.email}
        </p>
      )}
      {data.gender && (
        <p>
          {" "}
          <b>Gender</b> : {data.gender}
        </p>
      )}
      {data.occupation && (
        <p>
          {" "}
          <b>Occupation</b> : {data.occupation}
        </p>
      )}
      {data.lastPurchaseAmount && (
        <p>
          <b>LastPurchaseAmount</b> : {data.lastPurchaseAmount}
        </p>
      )}
    </div>
  );
};
export default UserCard;
