import {
  Avatar,
  Box,
  Button,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

//components
import PostInfo from "../Posts/PostInfo";
//store
import { showToast } from "@store/toast/toastsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { closeModal } from "@store/Modal/modalSlice";
//ui
import Input from "@components/ui/Input";
//hooks
import { useCallback, useState } from "react";
//feedback
import Spinner from "@components/feedback/Spinner/Spinner";
//Queries
import useGetPostInfo from "@hooks/Posts/useGetPostInfo";
import useCreateComment from "@hooks/Comments/useCreateComment";
//types
import { type IPost } from "@/types";
//react-router
import { useNavigate } from "react-router";

const AddCommentModal = ({
  id,
  author,
  body,
  created_at,
  title,
  image,
  comments_count,
}: IPost) => {
  const navigate = useNavigate();

  const [commentInput, setCommentInput] = useState("");
  const [isError, setIsError] = useState(false);
  const addCommentHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCommentInput(e.target.value);
      setIsError(false);
    },
    []
  );
  const addComment = useCreateComment();
  const handleAddCommentClick = () => {
    // Validate input
    if (!commentInput.trim() || commentInput.length < 1) {
      setIsError(true);
      return;
    }
    addComment.mutate(
      { comment: commentInput, id },
      {
        onSuccess: () => {
          setCommentInput("");
          dispatch(
            showToast({
              message: "Comment added successfully",
              severity: "success",
            })
          );
        },
        onError: () => {
          if (addComment.error) {
            dispatch(
              showToast({
                message: addComment.error?.message,
                severity: "error",
              })
            );
          }
        },
      }
    );
  };

  const { token } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  const { data: postInfo, isLoading } = useGetPostInfo(id);
  const comments = postInfo?.comments;
  const commentsList = comments?.map((comment) => (
    <ListItem
      key={comment.id}
      alignItems="flex-start"
      sx={{
        width: "100%",
      }}
    >
      <ListItemAvatar>
        <Avatar
          alt={comment.author.name}
          src={comment.author.profile_image}
          onClick={() => {
            navigate(`/profile/${comment.author.id}`);
            dispatch(closeModal());
          }}
          sx={{ cursor: "pointer" }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: "15px",
          padding: "10px",
        }}
        primary={
          <Typography
            onClick={() => {
              navigate(`/profile/${comment.author.id}`);
              dispatch(closeModal());
            }}
            style={{ fontWeight: "800", fontSize: "1rem", cursor: "pointer" }}
          >
            {comment.author.name}
          </Typography>
        }
        secondary={
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {comment.body}
          </Typography>
        }
      />
    </ListItem>
  ));
  return (
    <PostInfo
      title={title}
      body={body}
      image={image}
      created_at={created_at as string}
      author={author}
    >
      <Box sx={{ padding: "4px 8px" }}>
        <Typography variant="subtitle1" color="initial">
          {comments_count} comments
        </Typography>
      </Box>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments_count === 0 && (
          <Box sx={{ padding: "8px 16px" }}>There's no comments yet</Box>
        )}
        {isLoading ? <Spinner /> : commentsList}
      </List>
      {token && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            borderTop: "1px solid #eee",
            zIndex: 10,
          }}
        >
          <Input
            size="small"
            name="comment"
            label="Add a comment"
            variant="outlined"
            autoFocus={true}
            value={commentInput}
            onChange={addCommentHandler}
            sx={{ flexGrow: 3 }}
            error={isError}
            helperText={
              isError ? "Comment must be at least 1 character" : undefined
            }
          />
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            onClick={handleAddCommentClick}
            disabled={addComment.isPending}
          >
            Comment
          </Button>
        </CardActions>
      )}
    </PostInfo>
  );
};
export default AddCommentModal;
