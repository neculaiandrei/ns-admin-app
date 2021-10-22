import { useHistory } from "react-router";
import { Group } from "../../Data";
import './GroupsPage.scss';

interface GroupsPageHeaderProps {
  group?: Group;
}

export const GroupsPageHeader: React.FC<GroupsPageHeaderProps> = ({ group }) => {
  const history = useHistory();

  const goToPersonAdd = () => {
    history.push("/group/add");
  };

  const goToPersonsLink = () => {
    history.push("/persons/link");
  };

  return (
    <div className="header">
      <div className="nav">
        {group ? (
          <span>
            <span> {"<"} </span>{group?.name}
          </span>
        ) : <div></div>}
      </div>
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonAdd}>
        Add Group
      </button>
      <button className="btn btn-primary ns-btn ns-btn-primary" onClick={goToPersonsLink}>
        Link Persons
      </button>
    </div>
  );
}