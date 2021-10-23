export interface Group {
  id: number;
  parentId?: number;
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

export interface StoreData {
  groups: Group[],
  persons: Person[],
  links: GroupPersonLink[]
}