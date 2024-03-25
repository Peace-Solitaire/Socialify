import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../../redux/slices/userSlice";
import PostWidget from "./PostWidget";
import axios from "axios";

const FeedWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.posts);
  const token = useSelector((state) => state.user.token);

  const getPosts = async () => {
    const {data} = await axios.get("/api/posts/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
     const {data} = await axios.get(
       `/api/posts/${userId}`,
       {
         headers: { Authorization: `Bearer ${token}` },
       }
     );
     dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile]);

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            name,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            // comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={name}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              // comments={comments}
            />
          )
        )}
    </>
  );

};

export default FeedWidget;
