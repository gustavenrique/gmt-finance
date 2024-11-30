import { Client, Account, ID, Databases } from "react-native-appwrite";
import Config from "./config";
import { Order } from "../app/dtos/Order";

const client = new Client();

client
  .setEndpoint(Config.appWrite.endpoint)
  .setProject(Config.appWrite.projectId)
  .setPlatform(Config.appWrite.platform);

const databases = new Databases(client);

export const placeOrder = (order: Order) => {
  // buscar userId
  // buscar criar documento
};
