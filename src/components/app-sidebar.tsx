"use client";

import * as React from "react";
import { Command, Home, Save, ScrollText, Settings, User } from "lucide-react";

import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading } from "@/redux/loaderSlice";
import { usePathname, useRouter } from "next/navigation";
import { setCurrentUser } from "@/redux/userSlice";
import { IUserState } from "@/interfaces/redux/IUserState";

const data = {
  navSecondary: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Applications",
      url: "/applications",
      icon: ScrollText,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Saved",
      url: "/saved",
      icon: Save,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: { users: IUserState }) => state?.users?.currentUser
  );

  React.useEffect(() => {
    getCurrentUser();
  }, [pathname]);

  const getCurrentUser = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get("/api/users/currentUser");
      dispatch(setCurrentUser(res.data.data));
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response?.data?.message || "Unknown error",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout: () => void = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post("/api/users/logout");
      if (res.data) {
        toast({
          description: res.data.message,
        });
      }
      setCurrentUser(null);
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response?.data?.message || "Unknown error",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-xl">JOB APP</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        {currentUser && <NavUser user={currentUser} logout={logout} />}
      </SidebarFooter>
    </Sidebar>
  );
}
