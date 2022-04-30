import mongoose from "mongoose";

export function connectMongo() {
  const mongoConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
  mongoose.connection.on("error", console.log);
  return mongoose.connect(mongoConnectionString, { keepAlive: true });
}
