import SignOut from "@/components/sign-out";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <h1>Logged-in</h1>
        <SignOut />
      </div>
    </div>
  );
}