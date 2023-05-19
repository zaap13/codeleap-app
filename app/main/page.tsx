import Header from "@/components/Header";
import NewPost from "@/components/NewPost";

export default function Home() {
  return (
    <div className="flex flex-col lg:mx-[15%] items-center bg-white">
      <Header />
      <NewPost />
    </div>
  );
}
