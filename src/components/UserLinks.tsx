"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserLinks = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span
            className="ml-2 cursor-pointer"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/"); // Redirect to the home page after signing out
              });
            }}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
