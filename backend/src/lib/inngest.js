import {Inngest} from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

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

        //Create user in MongoDB
        await User.create(newUser);

        //Create user in Stream
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage
        })
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

        // Delete user from MongoDB
        await User.deleteOne({clerkId: id});

        // Delete user from Stream
        await deleteStreamUser(id.toString());
      } 
);

export const functions =[syncUser, deleteUserFromDB]; 