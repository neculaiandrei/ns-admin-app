import { PersonList } from "./PersonList";

export const PersonsPage = ({persons}: any) => (
  <div className="ns-persons-page">
      <div className="header">
        <button className="btn btn-primary ns-btn ns-btn-primary">
          Add Person
        </button>
      </div>
      <PersonList persons={persons} />
  </div>
);