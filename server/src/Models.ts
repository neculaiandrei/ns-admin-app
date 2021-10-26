export interface Group {
  id: number;
  parentId: number | null;
  name: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface GroupPersonLink {
  groupId: number;
  personId: number;
}

export interface AggregateData {
  persons: Person[];
  groups: Group[];
  links: GroupPersonLink[];
}

export type repositoryCallback = (err: any, data: any) => void;