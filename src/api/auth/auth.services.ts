import db from "../../utils/db";
import hashToken from "../../utils/hash-token";

const addRefreshTokenWhiteList = ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId: userId,
    },
  });
};

const findRefreshTokenById = (id: string) => {
  return db.refreshToken.findUnique({
    where: {
      id: id,
    },
  });
};

const deleteRefreshToken = (id: string) => {
  return db.refreshToken.update({
    where: {
      id: id,
    },
    data: {
      revoked: true,
    },
  });
};

const revokeTokens = (userId: string) => {
  return db.refreshToken.updateMany({
    where: {
      userId: userId,
    },
    data: {
      revoked: true,
    },
  });
};

export {
  addRefreshTokenWhiteList,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
};
