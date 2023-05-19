import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex h-screen bg-black justify-center w-screen">
      <Header />
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <h1>Logged-in</h1>
      </div>
    </div>
  );
}
