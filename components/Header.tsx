"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import Button from "./Button";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();

    const handleLogout = () => {
        // TODO: handle logging out
        console.log("Log Out");
    };

    return (
        <div
            className={twMerge(
                `
				h-fit 
				bg-gradient-to-b 
				from-rose-900
				p-6
				`,
                className
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                {/* Desktop View */}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="
              rounded-lg 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
              rounded-lg 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                {/* Mobile View */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        onClick={() => router.push("/")}
                        className="
              rounded-lg 
              p-2 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <HiHome className="text-white" size={20} />
                    </button>
                    <button
                        onClick={() => router.push("/search")}
                        className="
              rounded-lg
              p-2 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <BiSearch className="text-white" size={20} />
                    </button>
                </div>
                {/*  */}
                <div className="flex justify-between items-center gap-x-4">
                    <>
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} className="bg-black px-6 py-2">
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push("/account")}
                                className="bg-black"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    );
};
export default Header;