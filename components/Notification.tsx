"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import socket from "@/utils/socket";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  const [newTopics, setNewTopics] = useState<any>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on("new-topic", (data) => {
      setNewTopics((prevTopics: any) => [...prevTopics, data]);
    });

    return () => {
      socket.off("new-topic");
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative cursor-pointer text-foreground">
          <IoMdNotificationsOutline size={30} className="text-foreground" />
          {newTopics.length > 0 && (
            <div className="absolute top-[-6px] right-[-6px] bg-rose-500 h-5 w-5 rounded-full flex justify-center items-center">
              <p className="text-xs text-white">{newTopics.length}</p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 border-2 border-muted rounded-2xl max-h-56 overflow-y-auto">
        <DropdownMenuLabel>
          {newTopics.length > 0 ? (
            newTopics.map((notification: any, index: number) => (
              <DropdownMenuItem key={index} className="cursor-pointer">
                <Link href="/admin/messages">
                  <p className="text-sm tracking-wide text-white/80">
                    An issue rised by {notification?.user?.name.substring(0, 6)}
                    ...
                  </p>
                  <p className="text-sm tracking-wide text-white/80">
                    {notification?.topic?.title.substring(0, 25)}...
                  </p>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="paragraph">No new notifications</p>
          )}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
