import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API Key or Secret is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // this is for chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // this will be use for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log(
      `Stream user with ID ${userData.id} upserted successfully.`,
      userData
    );
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log(`Stream user with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error("Error Deleting Stream user:", error);
  }
};
