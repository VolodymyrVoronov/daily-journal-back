import bcrypt from "bcrypt";

import db from "../../utils/db";

const findUserByLogin = (login: string) => {
  return db.user.findUnique({
    where: {
      login: login,
    },
  });
};

const createUserByLoginAndPassword = (user: {
  login: string;
  password: string;
}) => {
  user.password = bcrypt.hashSync(user.password, 10);

  return db.user.create({
    data: user,
  });
};

const findUserById = (id: string) => {
  return db.user.findUnique({
    where: {
      id: id,
    },
  });
};

export { createUserByLoginAndPassword, findUserById, findUserByLogin };
