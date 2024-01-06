interface NotificationType {
  id: number;
  is_read: boolean;
  sender_id: number;
  sender_name: string;
  video_id?: number;
  channel_id?: number;
  comment_id?: number;
  like_id?: number;
  type?: string;
  created_at?: Date;
}