import React from "react";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
      className="form-control"
        type="text"
        value={props.value}
        onChange={(event) => props.setsearchValue(event.target.value)}
        placeholder="Enter movie name.."
      />
    </div>
  );
};

export default SearchBox;
