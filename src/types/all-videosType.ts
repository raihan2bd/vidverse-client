interface VideoType {
  id: number;
  title: string;
  thumb: string;
  views: number;
  channel_id: number;
  channel_title: string;
  channel_logo: string;
}

interface CommentType {
  id: number;
  user_id: number;
  user_name: string;
  avatar: string;
  comment: string;
  channel_id?: number;
}

type VideoFromDetails = {
  id: number;
  title: string;
  thumb: string;
  channel_id: number;
  vid_src: string;
  description: string
};