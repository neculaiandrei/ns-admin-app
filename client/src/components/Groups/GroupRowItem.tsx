import { useHistory } from "react-router-dom";
import { Group } from "../Models";

export interface GroupRowItemProps {
  group: Group,
  onSelect: (id: number) => void
};

export const GroupRowItem: React.FC<GroupRowItemProps> = (props) => {
  const history = useHistory();

  const goToPersonDetail = () => {
    history.push(`/group/info/${props.group.id}`);
  };

  const goToPersonEdit = () => {
    history.push(`/group/edit/${props.group.id}`);
  };

  const goToMove = () => {
    history.push('/move');
  };
  
  return (
    <li className="list-group-item ns-list-item">
      <div className="ns-list-item-info-group" onClick={() => props.onSelect(props.group.id)}>
        <i className="fas fa-users"></i>
        {props.group.name}
      </div>
      <div>
        <button className="btn btn-default btn-sm ns-btn" onClick={goToPersonDetail}>
          <i className="fas fa-info-circle"></i>
        </button>
        <button className="btn btn-default btn-sm ns-btn" onClick={goToPersonEdit}>
          <i className="far fa-edit"></i>
        </button>
        <button className="btn btn-default btn-sm ns-btn" onClick={goToMove}>
          <i className="fas fa-arrows-alt"></i>
        </button>
      </div>
    </li>
  );
};