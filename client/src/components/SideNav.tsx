import { useHistory } from 'react-router'
import './SideNav.scss'

export const SideNav = () => {
  const history = useHistory();

  const goToPersons = () => {
    history.push("/persons");
  }

  const goToGroups = () => {
    history.push("/groups");
  }


  return (
    <div className="ns-side-nav">
      <div onClick={goToPersons}>
        <i className="fas fa-user"></i>
        <span>Persons</span>
      </div>
      <div onClick={goToGroups}>
        <i className="fas fa-users"></i>
        <span>Groups</span>
      </div>
    </div>
  );
};