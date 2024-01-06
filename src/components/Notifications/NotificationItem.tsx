import Link from "next/link";
import { title } from "process";

// type Notification struct {
// 	CustomModel
// 	IsRead     bool   `gorm:"type:boolean;not null;default:false" json:"is_read,omitempty"`
// 	ReceiverID uint   `gorm:"foreignKey:ReceiverID;references:ID; not null;" json:"receiver_id,omitempty"`
// 	SenderID   uint   `gorm:"foreignKey:SenderID;references:ID; not null;" json:"sender_id,omitempty"`
// 	SenderName string `gorm:"type:varchar(100);not null;" json:"sender_name,omitempty"`
// 	VideoID    uint   `gorm:"foreignKey:VideoID;references:ID;" json:"video_id,omitempty"`
// 	ChannelID  uint   `gorm:"foreignKey:ChannelID;references:ID;" json:"channel_id,omitempty"`
// 	CommentID  uint   `gorm:"foreignKey:CommentID;references:ID;" json:"comment_id,omitempty"`
// 	LikeID     uint   `gorm:"foreignKey:LikeID;references:ID;" json:"like_id,omitempty"`
// 	Type       string `gorm:"type:varchar(100);not null;" json:"type,omitempty"`
// }
// generated typescript interface for Notification

type PropsTypes = {
  title: string;
  link: string;
  onDismiss: () => void;
}

const NotificationItem = ({link, title, onDismiss}:PropsTypes) => {
  return (<li className="w-full" onClick={onDismiss}>
    <Link className="w-full block bg-white text-violet-950" href={link}>{title}</Link>
  </li>)
}

export default NotificationItem;