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

export interface StoreData {
  groups: Group[],
  persons: Person[],
  links: GroupPersonLink[]
}

export const getDefaultGroup: () => Group = () => ({
  id: 0,
  name: '',
  dateCreated: '',
  dateUpdated: '',
  parentId: null
});

export const getDefaultPerson: () => Person = () => ({
  id: 0,
  firstName: '',
  lastName: '',
  jobTitle: '',
  dateCreated: '',
  dateUpdated: ''
});

export const getDefaultStoreData: () => StoreData = () => ({
  groups: [],
  persons: [],
  links: []
});

