"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import {
  IconCalendarEvent,
  IconHeartHandshake,
  IconUserCog,
  IconArchiveFilled,
  IconBookFilled,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/app/lib/utils";
import ManageEvent from "./ManageEvent";
import AdminManagement from "./AdminManagement";
import CompanyPartners from "./CompanyPartners";
import Archive from "./Archive";
import Publications from "./Publications";

export function AdminSettingsSidebar() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Manage Event");

  const links = [
    {
      label: "Manage Event",
      href: "#manageEvent",
      icon: (
        <IconCalendarEvent className="h-5 w-5 shrink-0 text-[#326333] dark:text-neutral-200" />
      ),
    },
    {
      label: "Admin Management",
      href: "#adminManagement",
      icon: (
        <IconUserCog className="h-5 w-5 shrink-0 text-[#326333] dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Company Partners",
      href: "#manageCompanyPartners",
      icon: (
        <IconHeartHandshake className="h-5 w-5 shrink-0 text-[#326333] dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Publications",
      href: "#publications",
      icon: (
        <IconBookFilled className="h-5 w-5 shrink-0 text-[#326333] dark:text-neutral-200" />
      ),
    },
    {
      label: "Archive",
      href: "#archive",
      icon: (
        <IconArchiveFilled className="h-5 w-5 shrink-0 text-[#326333] dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full sm:max-w-[80vw] flex-1 flex-col overflow-x-hidden overflow-y-auto rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 mt-10",
        "h-[80vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTab(link.href);
                    setOpen(false);
                  }}
                >
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard selectedTab={selectedTab} />
    </div>
  );
}
export const Logo = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-[#326333]">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-[#326333] dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-[#326333] dark:text-white font-cormorant text-xl"
      >
        Admin Settings
      </motion.span>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-[#326333]">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-[#326333] dark:bg-white" />
    </div>
  );
};

const Dashboard = ({ selectedTab }: { selectedTab: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedTab]);

  return (
    <div className="flex w-full h-full">
      <div className="flex h-full w-full gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {isLoading ? (
          <div className="flex flex-1 gap-2">
            {[...new Array(2)].map((i, idx) => (
              <div
                key={"second-array" + idx}
                className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {selectedTab === "Manage Event" && <ManageEvent />}
            {selectedTab === "#manageEvent" && <ManageEvent />}
            {selectedTab === "#adminManagement" && <AdminManagement />}
            {selectedTab === "#manageCompanyPartners" && <CompanyPartners />}
            {selectedTab === "#publications" && <Publications />}
            {selectedTab === "#archive" && <Archive />}
          </>
        )}
      </div>
    </div>
  );
};
