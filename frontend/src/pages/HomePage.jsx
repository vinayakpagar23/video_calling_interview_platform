import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import toast from "react-hot-toast";

function HomePage() {
  return (
    <>
      <h1 className="text-red-600">Welcome to the App</h1>
      <button
        className="btn btn-primary"
        onClick={() => toast.success("This is the sucess")}
      >
        Click Me
      </button>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign Up</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default HomePage;
