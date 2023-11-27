"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import useSound from "use-sound";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types/types";
import LikeButton from "../LinkButton";
import MediaItem from "../MediaItem";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const PlayPauseIcon = isPlaying ? BsPauseFill : BsPlayFill;

    // player
    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"],
    });

    // automatically play song when player component is loaded
    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        };
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem song={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* Mobile Player Controls */}
            <div
                className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
            >
                <div
                    onClick={handlePlay}
                    className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-lg 
              bg-red-500 
              p-1 
              cursor-pointer
            "
                >
                    <PlayPauseIcon size={30} className="text-black" />
                </div>
            </div>

            {/* Desktop Player Controls */}
            <div
                className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
            >
                <div
                    onClick={handlePlay}
                    className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-lg 
              bg-red-500 
							hover:bg-red-300 
							transition
              p-1 
              cursor-pointer
            "
                >
                    <PlayPauseIcon size={30} className="text-black" />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;