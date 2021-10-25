import { useHistory } from "react-router";

export const PersonsLinkHeader = () => {
  const history = useHistory();

  return (
    <div className="header">
      <button className="btn btn-primary ns-btn ns-btn-primary">
        <i className="fas fa-check"></i> Save
      </button>
    </div>
  );
}