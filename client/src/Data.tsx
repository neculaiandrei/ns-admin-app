import faker from 'faker';

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

export const generatePersons = (n: number): Person[] => {
    const result: Person[] = [];

    for (let i = 0; i < n; i++) {
        const person: Person = {
            id: faker.datatype.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            dateCreated: faker.date.past(1).toISOString(),
            dateUpdated: faker.date.past(1).toISOString()
        };

        result.push(person);
    }

    return result;
}

const persons = generatePersons(100);

export default persons;