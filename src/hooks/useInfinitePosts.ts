// import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
// import api from "../services/axios-global";
// import { IPost } from "../types";

// // API response structure
// interface PostsResponse {
//   data: IPost[];
//   links: {
//     first: string;
//     last: string;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     current_page: number;
//     last_page: number;
//     per_page: number;
//     total: number;
//     from: number;
//     to: number;
//     path: string;
//     links: Array<{
//       url: string | null;
//       label: string;
//       active: boolean;
//     }>;
//   };
// }

// // Return type for getPosts
// export interface PostsPage {
//   data: IPost[];
//   currentPage: number;
//   nextPage: number | null;
// }

// const getPosts = async ({ pageParam = 1 }: { pageParam: number }): Promise<PostsPage> => {
//   const postsResponse = await api.get<PostsResponse>(`/posts?limit=5&page=${pageParam}`);
//   console.log("API Response:", postsResponse.data); // Debugging log
//   const { data, meta } = postsResponse.data;

//   // Handle invalid API responses
//   if (!meta || typeof meta.current_page !== "number" || typeof meta.last_page !== "number") {
//     throw new Error("Invalid API response format");
//   }

//   return {
//     data,
//     currentPage: meta.current_page,
//     nextPage: meta.current_page < meta.last_page ? meta.current_page + 1 : null,
//   };
// };

// const useInfinitePosts = () => {
//   return useInfiniteQuery<PostsPage, Error, PostsPage, ["posts"], number>({
//     queryKey: ["posts"],
//     queryFn: ({ pageParam = 1 }: QueryFunctionContext<["posts"], number>) => getPosts({ pageParam }),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       console.log("Last Page:", lastPage); // Debugging log
//       return lastPage.nextPage !== null ? lastPage.nextPage : undefined;
//     },
//   });
// };

// export default useInfinitePosts;

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import api from "../services/axios-global"
import { IPost } from "../types";
interface PostsResponse {
  data: IPost[];
  meta: {
    current_page: number;
    last_page: number;
  }
}
const getPosts = async ({ pageParam }: QueryFunctionContext): Promise<PostsResponse> => {
  const { data } = await api.get<PostsResponse>(`/posts?limit=10&page=${pageParam}`);
  return data
}
const useInfinitePosts = () => {
  return useInfiniteQuery<PostsResponse, Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage
      return meta.current_page < meta.last_page ? meta.current_page + 1 : undefined
    }
  })
}
export default useInfinitePosts