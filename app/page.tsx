import Login from "@/components/login";
import Signup from "@/components/signup";
import Image from "next/image";

export const metadata = {
  title: "Attendancy App",
  description: "Welcom to the attendacy app",
};
export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Login />
    </main>
  );
}
