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
  name: string;
  avatar: string;
  comment: string;
  channel_id?: number;
}