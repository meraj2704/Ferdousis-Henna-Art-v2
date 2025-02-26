import { Aclonica, Roboto } from "next/font/google";

export const aclonica = Aclonica({ weight: "400", subsets: ["latin"] });
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
