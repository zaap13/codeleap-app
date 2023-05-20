"use client";
import Header from "@/components/Header";
import NewPost from "@/components/NewPost";
import Posts from "@/components/Posts";
import Provider from "@/components/Provider";

export default function Home() {
  return (
    <Provider>
      <div className="flex flex-col lg:mx-[15%] items-center bg-white">
        <Header />
        <NewPost />
        <Posts />
      </div>
    </Provider>
  );
}
