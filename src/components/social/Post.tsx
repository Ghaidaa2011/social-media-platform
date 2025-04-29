import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Card, Chip, Stack } from "@mui/material";
//hooks
import { memo } from "react";
//components
import AddCommentButton from "./AddCommentModal/AddCommentButton";
import PostInfo from "./PostInfo";
import EditPostButton from "./EditPostModal/EditPostButton";
import DeletePostButton from "./DeletePostModal/DeletePostButton";
//types
import { IPost } from "../../types";

const Post = memo(
  ({
    id,
    title,
    body,
    image,
    created_at,
    comments_count,
    tags,
    author,
  }: IPost) => {
    console.log("Post");
    return (
      <Card
        sx={{
          marginBottom: { xs: "1vh", sm: "2vh", md: "3vh", lg: "4vh" },
          boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.9)",
        }}
      >
        <PostInfo
          title={title}
          body={body}
          image={image}
          created_at={created_at as string}
          author={author}
          actions={
            <Stack direction="row" spacing={1}>
              <DeletePostButton id={id} />
              <EditPostButton
                id={id}
                title={title}
                body={body}
                image={image}
                author={author}
              />
            </Stack>
          }
        >
          <CardActions
            disableSpacing
            sx={{ cursor: "pointer", padding: "4px 8px" }}
          >
            <AddCommentButton
              id={id}
              title={title}
              body={body}
              image={image}
              created_at={created_at}
              comments_count={comments_count}
              tags={tags}
              author={author}
            />
            <Typography variant="subtitle1" color="initial">
              ({comments_count}) comments
            </Typography>

            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.arabic_name}
                  size="small"
                  sx={{ marginX: "5px" }}
                />
              ))}
          </CardActions>
        </PostInfo>
      </Card>
    );
  }
);
export default Post;
