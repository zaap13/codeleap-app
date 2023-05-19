export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export const fetchPosts = async ({ pageParam = 1 }): Promise<ApiResponse> => {
  const response = await fetch(
    `https://dev.codeleap.co.uk/careers/?limit=10&offset=${
      (pageParam - 1) * 10
    }`
  );
  const data: ApiResponse = await response.json();
  return data;
};

export const createPost = async (
  post: Omit<Post, "id" | "created_datetime">
): Promise<ApiResponse> => {
  const response = await fetch(`https://dev.codeleap.co.uk/careers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const updatePost = async (
  id: number,
  post: Partial<Omit<Post, "id" | "created_datetime">>
): Promise<ApiResponse> => {
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
    method: "DELETE",
  });
};
