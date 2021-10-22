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

const generatePersons = (n: number): Person[] => {
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

const generateGroup = (n: number): Group[] => {
    const result: Group[] = [];

    for (let i = 0; i < n; i++) {
        const group: Group = {
            id: faker.datatype.number(),
            name: faker.lorem.word(),
            dateCreated: faker.date.past(1).toISOString(),
            dateUpdated: faker.date.past(1).toISOString()
        };

        result.push(group);
    }

    result[1].parentId = result[0].id;
    result[2].parentId = result[0].id;
    result[3].parentId = result[2].id;
    result[4].parentId = result[2].id;

    return result;
};

const generateGroupPersonLink = (persons: Person[], groups: Group[]) => {
    const result: GroupPersonLink[] = [];

    for (let i = 0; i < persons.length; i++) {
        const linksCount = Math.floor(Math.random() * 3);

        for (let j = 0; j < linksCount; j++) {
            let randomGroup = groups[Math.floor(Math.random() * groups.length)];
            result.push({
                personId: persons[i].id,
                groupId: randomGroup.id
            });
        }
    }

    return result;
};

const persons = generatePersons(100);
const groups = generateGroup(10);
const links = generateGroupPersonLink(persons, groups);

export { persons, groups, links };