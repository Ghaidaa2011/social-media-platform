import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Chip, Divider } from "@mui/material";
import { IPost } from "../../types";
import { memo } from "react";

const Post = memo(
  ({ title, body, image, created_at, comments_count, tags, author }: IPost) => {
    console.log("Post");
    return (
      <Card
        sx={{
          marginY: { xs: "2vh", sm: "3vh", md: "4vh", lg: "5vh" },
          boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.9)",
        }}
      >
        <CardHeader
          sx={{ padding: "8px 16px" }}
          avatar={
            <Avatar
              aria-label="profile"
              src={
                typeof author.profile_image === "string"
                  ? author.profile_image
                  : ""
              }
            />
          }
          title={<h3>{author.username}</h3>}
          subheader={
            <Typography variant="caption" color="text.secondary">
              {created_at}
            </Typography>
          }
        />
        <Divider />
        {typeof image !== "string" || image === "" ? (
          ""
        ) : (
          <CardMedia
            component="img"
            sx={{ height: { xs: "30vh", sm: "40vh", md: "50vh" } }}
            style={{
              padding: "10px",
              width: "100%",
              objectFit: "cover", // Crop to fit, maintaining aspect ratio
              objectPosition: "center",
              borderRadius: "15px",
            }}
            image={image}
            alt="postImage"
            loading="lazy"
          />
        )}
        <CardContent>
          <Typography style={{ fontWeight: "700" }}>{title}</Typography>
          <Typography style={{ fontWeight: "500", fontSize: "0.8rem" }}>
            {body}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions disableSpacing sx={{ cursor: "pointer" }}>
          <IconButton aria-label="add a comment">
            <AddCommentIcon style={{ color: "rgba(0,0,0,0.8)" }} />
          </IconButton>
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
      </Card>
    );
  }
);
export default Post;
