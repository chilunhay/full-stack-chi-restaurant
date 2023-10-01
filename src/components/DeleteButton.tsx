"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product ?")) {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        router.push("/menu");
        toast.success("The product has been deleted!");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="delete button" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
