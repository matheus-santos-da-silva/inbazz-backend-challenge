import { sign } from "jsonwebtoken";

export const getTestAuthToken = () => {
  return sign({ name: "inbazz" }, process.env.JWT_SECRET);
};
