import { Poppins, Pacifico } from "next/font/google";

export const primaryFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
export const logoFont = Pacifico({ weight: "400" });
