import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import { IAuthor } from "../../types/posts.types";
import { useAppSelector } from "../../store/hooks";

export interface PostInfoProps {
  title: string;
  body: string;
  image?: string;
  created_at: string;
  author: IAuthor;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}
const PostInfo = ({
  title,
  body,
  image,
  created_at,
  author,
  children,
  actions,
}: PostInfoProps) => {
  const { user } = useAppSelector((state) => state.authentication);

  return (
    <>
      <CardHeader
        sx={{ padding: "8px 16px" }}
        avatar={
          <Avatar
            aria-label="profile"
            src={
              typeof author?.profile_image === "string"
                ? author.profile_image
                : ""
            }
          />
        }
        title={<h3>{author?.username}</h3>}
        subheader={
          <Typography variant="caption" color="text.secondary">
            {created_at}
          </Typography>
        }
        action={user?.id === author?.id && actions}
      />
      <Divider />
      {typeof image !== "string" || image === "" ? (
        ""
      ) : (
        <CardMedia
          component="img"
          sx={{ height: { xs: "25vh", sm: "30vh", md: "40vh" } }}
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
      <CardContent sx={{ padding: "8px 16px" }}>
        <Typography style={{ fontWeight: "700" }}>{title}</Typography>
        <Typography style={{ fontWeight: "500", fontSize: "0.8rem" }}>
          {body}
        </Typography>
      </CardContent>
      <Divider />
      {children}
    </>
  );
};

export default PostInfo;
