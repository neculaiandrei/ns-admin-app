import { useHistory } from "react-router-dom";
import { ListItem, ListItemButton } from "../common/ListItem";
import { Group } from "../Models";

export interface GroupRowItemProps {
  group: Group
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
    history.push(`/move/group/${props.group.id}`);
  };

  const goToGroup = () => {
    history.push(`/groups/${props.group.id}`);
  };
  
  return (
    <ListItem>
      <div className="ns-list-item-info-group" onClick={goToGroup}>
        <i className="fas fa-users"></i>
        {props.group.name}
      </div>
      <div>
        <ListItemButton iconClassName="fas fa-info-circle" onClick={goToPersonDetail} />
        <ListItemButton iconClassName="far fa-edit" onClick={goToPersonEdit} />
        <ListItemButton iconClassName="fas fa-arrows-alt" onClick={goToMove} />
      </div>
    </ListItem>
  );
};