import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div className="p-4 px-6 flex justify-between items-center shadow-md bg-white sticky top-0 z-50">
      {/* Logo and Brand Name Section */}
      <div className="flex items-center gap-3">
        <img src="/logo.svg" width={45} height={45} alt="CVNest Logo" className="object-contain" />
        <span className="text-xl font-bold text-blue-700 tracking-tight">CVNest</span>
      </div>

      {/* Navigation and User Actions */}
      {!isLoaded ? (
        // Loading state
        <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
      ) : isSignedIn ? (
        <div className="flex gap-4 items-center">
          <Link to={"/dashboard"}>
            <Button 
              variant={"outline"} 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md transition-all duration-200"
            >
              Dashboard
            </Button>
          </Link>
          <div className="flex items-center">
            <UserButton 
              afterSignOutUrl="/auth/sign-in"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 rounded-full border-2 border-blue-100 hover:border-blue-300 transition-all"
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to={"/auth/sign-in"}>
            <Button 
              variant={"outline"} 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-md transition-all duration-200"
            >
              Sign Up
            </Button>
          </Link>
          <Link to={"/auth/sign-in"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 font-medium shadow-sm hover:shadow transition-all duration-200">
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;