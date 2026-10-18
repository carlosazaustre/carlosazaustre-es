"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";

function MiniVideo({ video }: { video: YouTubeVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="mini-video">
      <div className="video-screen">
        {playing ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&rel=0&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            className="video-launch"
            type="button"
            aria-label={`Reproducir: ${video.title}`}
            onClick={() => setPlaying(true)}
          >
            <Image
              unoptimized
              src={video.thumbnail}
              alt=""
              width={480}
              height={360}
              loading="lazy"
            />
            <span className="video-play" aria-hidden="true">
              <Play />
            </span>
            <span className="video-prompt">Reproducir aquí</span>
          </button>
        )}
      </div>
      <div className="video-controls">
        <span>YouTube</span>
        <a href={video.url} aria-label={`Abrir en YouTube: ${video.title}`}>
          Abrir en YouTube <ArrowUpRight />
        </a>
      </div>
      <h3>
        <a href={video.url}>{video.title}</a>
      </h3>
      <time dateTime={video.published}>
        {new Date(video.published).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </time>
    </article>
  );
}
export default function HomeVideos({ videos }: { videos: YouTubeVideo[] }) {
  return (
    <section
      className="videos-section editorial-wrap"
      id="videos"
      aria-labelledby="videos-heading"
    >
      <div className="section-heading">
        <h2 id="videos-heading">
          Mejor en vídeo<span>.</span>
        </h2>
        <a href="https://youtube.com/@carlosazaustre/videos">
          Todo el canal <ArrowUpRight />
        </a>
      </div>
      <p className="section-description">
        Los últimos vídeos que he publicado en YouTube.
      </p>
      {videos.length ? (
        <div className="mini-videos">
          {videos.map((video) => (
            <MiniVideo key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <a
          className="solid-link"
          href="https://youtube.com/@carlosazaustre/videos"
        >
          Ver los últimos vídeos en YouTube <ArrowUpRight />
        </a>
      )}
    </section>
  );
}
