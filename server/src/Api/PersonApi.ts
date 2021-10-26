import express from "express";
import { PersonRepository } from "../Repositories";

export const usePersonApi = (app: express.Application) => {
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

  app.put('/api/person/move', (req, res) => {
    const personId = req.body.personId;
    const fromGroupId = req.body.fromGroupId;
    const toGroupId = req.body.toGroupId;

    PersonRepository.move(personId, fromGroupId, toGroupId, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
};