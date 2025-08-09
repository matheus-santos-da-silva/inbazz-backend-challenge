import {
  BadRequestResponseExample,
  NotFoundResponseExample,
  UnauthorizedResponseExample,
} from "./http-errors-examples";

export const HttpBadRequestError = {
  status: 400,
  description: "Error: Bad Request",
  type: BadRequestResponseExample,
};

export const HttpNotFoundError = {
  status: 404,
  description: "Error: Not Found",
  type: NotFoundResponseExample,
};

export const HttpUnauthorizedError = {
  status: 401,
  description: "Error: Unauthorized",
  type: UnauthorizedResponseExample,
};
