import { RequestHandler } from 'express';
import passport from 'passport';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError } from '../../common';

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    await passport.authenticate('local', (err, user, failureDetails) => {
      if (err !== null) {
        throw new Error(err);
      }

      if (!user) {
        res.status(HttpStatusCodes.Unauthorized).json(failureDetails);
        return;
      }

      req.login(user, err => {
        if (err) {
          throw new Error(err);
        }
        res.status(HttpStatusCodes.Ok).json({ message: 'Logged in' });
      });
    })(req, res, next);
  } catch (err) {
    logger.error('Error logging user', err);
    const error: ApiError = new ApiError('Error logging user', HttpStatusCodes.ServerError);
    next(error);
  }
};
