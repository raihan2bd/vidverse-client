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
  user_avatar: string;
  text: string;
  channel_id?: number;
  created_at: string;
}

type VideoFromDetails = {
  id: number;
  title: string;
  thumb: string;
  channel_id: number;
  vid_src: string;
  description: string
};