import { useHistory } from "react-router";

export const AppHeader = () => {
  const history = useHistory();
  
  const goToPersons = () => {
    history.push("/persons")
  };

  return (
    <div className="header">
      <span onClick={goToPersons}>Admin App</span>
    </div>
  )
};