import React from "react";

interface ListItemButtonProps {
  onClick: () => void;
  iconClassName: string;
}

export const ListItemButton: React.FC<ListItemButtonProps> = ({ onClick, iconClassName}) => (
  <button className="btn btn-default btn-sm ns-btn" onClick={onClick}>
    <i className={iconClassName}></i>
  </button>
);