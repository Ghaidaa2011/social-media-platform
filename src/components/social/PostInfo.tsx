import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import { IAuthor } from "../../types/posts.types";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  return (
    <>
      <CardHeader
        sx={{
          padding: "8px 16px",
          height: "48px",
          "& .MuiCardHeader-content": {
            height: "48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2px",
          },
          "& .MuiCardHeader-action": {
            alignSelf: "center",
            marginTop: 0,
            marginRight: 0,
          },
        }}
        avatar={
          <Avatar
            onClick={() => navigate(`/profile/${author?.id}`)}
            aria-label="profile"
            src={
              typeof author?.profile_image === "string"
                ? author.profile_image
                : ""
            }
            sx={{ width: "35px", height: "35px", cursor: "pointer" }}
          />
        }
        title={
          <h3
            onClick={() => navigate(`/profile/${author?.id}`)}
            style={{ margin: 0, lineHeight: 1.2, cursor: "pointer" }}
          >
            {author?.username}
          </h3>
        }
        subheader={
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1 }}
          >
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
