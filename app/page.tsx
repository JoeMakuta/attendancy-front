import Login from "@/components/login";
import Signup from "@/components/signup";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Login />
    </main>
  );
}
