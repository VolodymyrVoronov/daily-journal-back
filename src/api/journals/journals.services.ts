import db from "../../utils/db";

const findAllJournals = (
  userId: string,
  year: number,
  month: number,
  day: number
) => {
  return db.journal.findMany({
    where: {
      userId: userId,
      year: year,
      month: month,
      day: day,
    },
  });
};

const createJournal = (journal: {
  title: string;
  text: string;
  year: number;
  month: number;
  day: number;
  favorite: boolean;
  userId: string;
}) => {
  return db.journal.create({
    data: journal,
  });
};

const deleteJournal = (id: string) => {
  return db.journal.delete({
    where: {
      id: id,
    },
  });
};

const toggleFavoriteJournal = async (id: string) => {
  const journal = await db.journal.findUnique({
    where: {
      id: id,
    },
  });

  return await db.journal.update({
    where: {
      id: id,
    },
    data: {
      favorite: !journal?.favorite,
    },
  });
};

const updateJournal = (journal: {
  id: string;
  title: string;
  text: string;
}) => {
  return db.journal.update({
    where: {
      id: journal.id,
    },
    data: journal,
  });
};

export {
  createJournal,
  deleteJournal,
  findAllJournals,
  toggleFavoriteJournal,
  updateJournal,
};
