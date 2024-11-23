import { useMemo } from "react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiSignpostDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

export const adminSidebarItems: SidebarMenu = {
  menu: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      href: "/admin/dashboard",
    },
    {
      label: "Products",
      icon: MdOutlineProductionQuantityLimits,
      subItems: [
        {
          label: "All Products",
          icon: MdOutlineProductionQuantityLimits,
          href: "/admin/products/all-products",
        },
        {
          label: "Add Product",
          icon: MdOutlineProductionQuantityLimits,
          href: "/admin/products/add-product",
        },
      ],
    },
    {
      label: "Post",
      icon: PiSignpostDuotone,
      subItems: [
        {
          label: "All Posts",
          icon: MdOutlineProductionQuantityLimits,
          href: "/admin/all-posts",
        },
        {
          label: "Add post",
          icon: MdOutlineProductionQuantityLimits,
          href: "/admin/add-post",
        },
      ],
    },
  ],
  extra: {
    label: "Logout",
    icon: CiLogout,
    href: "/",
  },
};

export interface SidebarItem {
  label: string;
  icon: any;
  href?: string;
  subItems?: SidebarItem[];
}

export interface SidebarMenu {
  menu: SidebarItem[];
  extra: SidebarItem;
}

type SidebarItemKeys = "/admin";

const sidebarItemsMap: Record<SidebarItemKeys, SidebarMenu> = {
  "/admin": adminSidebarItems,
};

const useSidebarItems = (pathName: string) => {
  return useMemo(() => {
    const segments = pathName.split("/");
    if (segments.length >= 2) {
      const basePath = `/${segments[1]}` as SidebarItemKeys;
      if (basePath in sidebarItemsMap) {
        return sidebarItemsMap[basePath];
      }
    }
    return { menu: [], extra: { label: "", icon: undefined, href: "" } }; // Return a default value
  }, [pathName]);
};

export default useSidebarItems;
