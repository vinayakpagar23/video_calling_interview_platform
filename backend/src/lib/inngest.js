import {Inngest} from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngestClient = new Inngest({id:"interview_platform"});

const syncUser = inngestClient.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event, step}) => {
        await step.run("Connect to DB", async () => {
            await connectDB();
        });

        const {id, email_addresses, first_name, last_name, image_url} = event.data;

        const newUser ={
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name || "" } ${last_name || ""}`,
            profileImage: image_url
        }

        User.create(newUser);
      } 
);

const deleteUserFromDB = inngestClient.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({event, step}) => {
        await step.run("Connect to DB", async () => {
            await connectDB();
        });

        const {id} = event.data;
        await User.deleteOne({clerkId: id});
      } 
);

export const functions =[syncUser, deleteUserFromDB]; 