import { Clock, PlayCircle } from "lucide-react";
import { YoutubeVideo } from "./types";

interface Props {

    video: YoutubeVideo;

    active: boolean;

    onPlay: (video: YoutubeVideo) => void;

}

export default function VideoCard({

    video,

    active,

    onPlay,

}: Props) {

    return (

        <div

            className={`
                rounded-xl
                border
                p-3
                transition-all
                bg-white
                ${
                    active
                        ? "border-red-500 shadow-lg"
                        : "border-gray-200"
                }
            `}

        >

            <div className="flex gap-3">

                <img

                    src={video.thumbnail}

                    alt={video.title}

                    className="
                        w-28
                        h-20
                        rounded-lg
                        object-cover
                        flex-shrink-0
                    "

                />

                <div className="flex-1 min-w-0">

                    <h4

                        className="
                            text-sm
                            font-semibold
                            line-clamp-2
                        "

                    >

                        {video.title}

                    </h4>

                    <p

                        className="
                            text-xs
                            text-gray-500
                            mt-1
                            truncate
                        "

                    >

                        {video.channelTitle}

                    </p>

                    <div

                        className="
                            flex
                            items-center
                            gap-2
                            mt-2
                            text-xs
                            text-gray-500
                        "

                    >

                        <Clock size={14} />

                        {video.duration}

                    </div>

                </div>

            </div>

            <button

                type="button"

                onClick={() => onPlay(video)}

                className="
                    mt-3
                    w-full
                    rounded-lg
                    bg-red-600
                    text-white
                    py-2
                    flex
                    items-center
                    justify-center
                    gap-2
                "

            >

                <PlayCircle size={18} />

                {active ? "Now Playing" : "Play Video"}

            </button>

        </div>

    );

}