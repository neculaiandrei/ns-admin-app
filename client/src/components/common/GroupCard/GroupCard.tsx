import './GroupCard.scss';

interface GroupCardProps {
  title: string;
  className: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({ title, className, children}) => {
  return (
    <div className={`card ns-group-card ${className || ''}`}>
      <div className="card-header">
        <i className="fas fa-users"></i> {title}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}