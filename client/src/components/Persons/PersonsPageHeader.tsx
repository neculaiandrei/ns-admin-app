import { useHistory } from "react-router";

export const PersonsPageHeader = () => {
  const history = useHistory();

  const goToPersonAdd = () => {
    history.push("/person/add");
  }

  return (
    <div className="header">
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonAdd}>
        Add Person
      </button>
    </div>
  );
}