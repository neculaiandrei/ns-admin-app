import express from "express";
import { useAggregateApi } from "./AggregateApi";
import { useGroupApi } from "./GroupApi";
import { usePersonApi } from "./PersonApi";

export const useApi = (app: express.Application) => {
  useAggregateApi(app)
  useGroupApi(app);
  usePersonApi(app);

  app.get('/api*', (_, res) => res.status(404).send());
};