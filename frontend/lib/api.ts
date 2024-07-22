const BASE_URL = "http://localhost:3000";

export interface PostDto {
  title: string;
  content: string;
  author: string;
}

const sendRequest = async (url: string, init?: RequestInit) => {
  const res = await fetch(`${BASE_URL}${url}`, init);
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
};

export const getPosts = (url: string) => {
  return sendRequest(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createPost = async (data: PostDto) => {
  await sendRequest(`/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
