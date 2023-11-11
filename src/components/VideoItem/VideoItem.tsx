interface VideoItemProps {
    video: VideoType;
}

const VideoItem = ({video}: VideoItemProps) => {
    return (
        <li>
            <h2>{video.title}</h2>
            <p>{video.channel_title}</p>
        </li>
    )
}

export default VideoItem;