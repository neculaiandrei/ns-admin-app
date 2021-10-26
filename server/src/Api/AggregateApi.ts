import express from "express";
import { AggregateRepository } from "../Repositories";

export const useAggregateApi = (app: express.Application) => {
  app.get('/api/aggregate', (req, res) => {
    AggregateRepository.get((err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });

  app.delete('/api/aggregate', (req, res) => {
    AggregateRepository.del((err, data) => {
      if (err) {
        res.status(500).send();
      } else {
        res.json(data);
      }
    });
  });
};