import express, { NextFunction, Request, Response } from "express";

import {
  createJournal,
  deleteJournal,
  findAllJournals,
  toggleFavoriteJournal,
  updateJournal,
} from "./journals.services";

const router = express.Router();

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { year, month, day } = req.query;

    console.log(userId, year, month, day);

    const journals = await findAllJournals(
      userId,
      Number(year),
      Number(month),
      Number(day)
    );

    if (journals) {
      res.json(journals);
    } else {
      res.json({
        message: "No journals found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload;
      const { title, text, year, month, day, favorite } = req.body;

      await createJournal({
        title,
        text,
        year,
        month,
        day,
        favorite,
        userId,
      });

      res.json({
        status: 200,
        message: "Journal created",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, text } = req.body;

      await updateJournal({
        id,
        title,
        text,
      });

      res.json({
        status: 200,
        message: "Journal updated",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/favorite/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journalId = req.params.id;

      await toggleFavoriteJournal(journalId);

      res.json({
        status: 200,
        message: "Journal updated",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journalId = req.params.id;

      await deleteJournal(journalId);

      res.json({
        status: 200,
        message: "Journal deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
