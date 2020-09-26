import crypto from "crypto";

export const createId = () => crypto.randomBytes(10).toString("hex");
