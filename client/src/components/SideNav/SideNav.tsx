import { useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom';
import './SideNav.scss';

enum NavSelection {
  Persons,
  Groups,
  Other
}

export const SideNav = () => {
  const history = useHistory();
  const location = useLocation();
  const [selection, setSelection] = useState(NavSelection.Other);

  const goToPersons = () => {
    history.push("/persons");
  };

  const goToGroups = () => {
    history.push("/groups");
  };

  useEffect(() => {
    if (location.pathname === '/persons' || location.pathname === '/' || location.pathname === '') {
      setSelection(NavSelection.Persons);
    } else if (location.pathname === '/groups') {
      setSelection(NavSelection.Groups);
    } else {
      setSelection(NavSelection.Other);
    }
  }, [location.pathname]);


  return (
    <div className="ns-side-nav">
      <div onClick={goToPersons} className={selection === NavSelection.Persons ? 'selected' : ''}>
        <i className="fas fa-user"></i>
        <span>Persons</span>
      </div>
      <div onClick={goToGroups} className={selection === NavSelection.Groups ? 'selected' : ''}>
        <i className="fas fa-users"></i>
        <span>Groups</span>
      </div>
    </div>
  );
};