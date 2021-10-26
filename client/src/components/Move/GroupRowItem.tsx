import { ListItem } from "../common/ListItem";
import { Group } from "../Models";

export interface GroupRowItemProps {
  group: Group,
  onSelect: (group: Group) => void,
  disabled: boolean
};

export const GroupRowItem: React.FC<GroupRowItemProps> = (props) => {
  let className = "ns-list-item-info-group";

  if (props.disabled) {
    className += " disabled";
  };

  return (
    <ListItem>
      <div className={className} onClick={() => !props.disabled && props.onSelect(props.group)}>
        <i className="fas fa-users"></i>
        {props.group.name}
      </div>
    </ListItem>
  );
};