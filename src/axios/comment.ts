import {axiosIntance} from '.';

export class CommentApi {
  getComments(videoId: string, page: number) {
    return axiosIntance.get(
      `/comment/${videoId}` +
        new URLSearchParams({
          page: page.toString(),
        }),
    );
  }

  addComment(videoId: string, comment: string) {
    return axiosIntance.post(`/comment/${videoId}`, {comment});
  }

  deleteComment(commentId: string) {
    return axiosIntance.delete(`/comment/${commentId}`);
  }
}
