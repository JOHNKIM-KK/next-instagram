import HeartIcon from "@/components/ui/icons/HeartIcon";
import HeartFillIcon from "@/components/ui/icons/HeartFillIcon";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import BookmarkFillIcon from "@/components/ui/icons/BookmarkFillIcon";
import ToggleButton from "@/components/ui/ToggleButton";
import { parsDate } from "@/util/date";
import type { SimplePost, Comment } from "@/model/post";
import { usePosts } from "@/hooks/posts";
import { useMe } from "@/hooks/me";
import CommentForm from "@/components/CommentForm";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

const ActionBar = ({ post, children, onComment }: Props) => {
  const { id, likes, createdAt } = post;

  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    if (!user) return;

    setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    if (!user) return;

    setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    if (!user) return;
    onComment({
      comment,
      username: user.username,
      image: user.image,
    });
  };
  return (
    <>
      <div className={"flex justify-between m-2 p-4"}>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className={"px-4 py-1"}>
        <p
          className={"text-sm font-bold mb-2"}
        >{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {children}
        <p className={"text-xs text-neutral-500 uppercase my-2"}>
          {parsDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
};

export default ActionBar;
