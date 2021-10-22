import './PersonCard.scss';

interface PersonCardProps {
  title: string;
  className: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({ title, className, children}) => {
  return (
    <div className={`card ns-person-card ${className || ''}`}>
      <div className="card-header">
        <i className="fas fa-user"></i> {title}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}