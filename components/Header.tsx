import SignOut from "@/components/sign-out";

export default function Header() {
  return (
    <header className="flex w-full h-[80px] bg-blue items-center justify-between pr-4">
      <h1 className="font-bold text-[22px] text-white ml-8">
        CodeLeap Network
      </h1>
      <SignOut />
    </header>
  );
}
