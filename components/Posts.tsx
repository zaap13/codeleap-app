import {
  ApiResponse,
  fetchPosts,
  deletePost,
  updatePost,
  Post,
} from "actions/api";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { data: session } = useSession();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: post.title,
    content: post.content,
  });

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(() => deletePost(post.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      setIsDeleteModalOpen(false);
    },
  });

  const updatePostMutation = useMutation(
    () => updatePost(post.id, editFormData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        setIsEditModalOpen(false);
      },
    }
  );

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updatePostMutation.mutateAsync();

    setEditFormData({
      title: post.title,
      content: post.content,
    });
  };

  return (
    <div className="w-full rounded-[16px] border-[1px] border-postBorder mb-[24px]">
      <div className="flex h-70px w-full bg-blue p-[24px] rounded-t-[16px] text-white justify-between items-center">
        <h2 className="font-bold text-[22px]">{post.title}</h2>
        {post.username === session?.user?.name && (
          <div className="flex gap-2 text-[24px] justify-end">
            <BiEdit onClick={handleEditModalOpen} className="cursor-pointer" />
            <MdDeleteForever
              onClick={handleDeleteModalOpen}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="p-[24px]">
        <h3 className="font-bold text-[18px] text-darkGray">
          @{post.username}
        </h3>
        <p>{post.content}</p>
      </div>
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="editTitle"
                  className="block font-bold text-gray-700"
                >
                  Title
                </label>
                <input
                  id="editTitle"
                  name="title"
                  type="text"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editContent"
                  className="block font-bold text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="editContent"
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditFormChange}
                  className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEditModalClose}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue text-white py-2 px-4 rounded-lg font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Delete Post</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDeleteModalClose}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deletePostMutation.mutate()}
                className="bg-red-600 text-white py-2 px-4 rounded-lg font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Post = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiResponse>("posts", fetchPosts, {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  return (
    <div className="flex w-full max-w-[96%] flex-col">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.results.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-blue w-full mt-[24px] py-2 px-6 rounded-[8px] font-bold text-white"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Post;
