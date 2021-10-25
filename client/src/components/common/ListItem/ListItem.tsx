import React from 'react';
import './ListItem.scss';

export const ListItem: React.FC = ({ children }) => {
  return (
    <li className="list-group-item ns-list-item">
      {children}
    </li>
  );
};