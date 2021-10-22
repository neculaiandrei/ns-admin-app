import { useHistory } from "react-router";

export const PersonsPageHeader = () => {
  const history = useHistory();

  const goToPersonAdd = () => {
    history.push("/person/add");
  }

  return (
    <div className="header">
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonAdd}>
        <i className="fas fa-plus-circle"></i> Add
      </button>
    </div>
  );
}