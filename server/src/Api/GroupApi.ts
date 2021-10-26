import express from "express";
import { GroupRepository } from "../Repositories";

export const useGroupApi = (app: express.Application) => {
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

  app.put('/api/group/move', (req, res) => {
    const groupId = req.body.groupId;
    const fromGroupId = req.body.fromGroupId;
    const toGroupId = req.body.toGroupId;

    GroupRepository.move(groupId, fromGroupId, toGroupId, (err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
};