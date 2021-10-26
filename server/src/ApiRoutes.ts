import express from "express";
import { connection } from './DbConnection';
import AggregateRepository from "./Repositories/AggregateRepository";
import GroupRepository from "./Repositories/GroupRepository";
import PersonRepository from "./Repositories/PersonRepository";

export const useApiRoutes = (app: express.Application) => {
  app.get('/api/mysql', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
      res.json(rows[0].solution);
    });
  });
  
  app.get('/api/data', (req, res) => {
    AggregateRepository.get((err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });

  app.delete('/api/data', (req, res) => {
    AggregateRepository.del((err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
  
  app.post('/api/person', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const jobTitle = req.body.jobTitle;
  
    PersonRepository.add(firstName, lastName, jobTitle, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
  
  app.put('/api/person', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const jobTitle = req.body.jobTitle;
    const id = req.body.id;
  
    PersonRepository.update(id, firstName, lastName, jobTitle, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
  
  app.post('/api/group', (req, res) => {
    const name = req.body.name;
    const parentId = req.body.parentId;
  
    GroupRepository.add(name, parentId, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });

  app.put('/api/group', (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
  
    GroupRepository.update(id, name, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });

  app.post('/api/group/link', (req, res) => {
    const groupId = req.body.groupId;
    const personIds = req.body.personIds;

    GroupRepository.link(groupId, personIds, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
};