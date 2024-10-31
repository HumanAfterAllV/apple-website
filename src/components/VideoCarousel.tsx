import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

export default function VideoCarousel(): JSX.Element {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

    
    const [loadedData, setLoadedData] = useState<Event[]>([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const { startPlay, videoId, isEnd, isLastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider',{
            transform: `translateX(-${-100 * videoId}%)`,
            duration: 2,
            ease: 'power4.inOut'
        });

        gsap.to('#video', {
            scrollTrigger:{
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((prevVideo) => ({...prevVideo, startPlay: true, isPlaying: true}));
            }
        })
    },[isEnd, videoId])

    useEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if(span[videoId]){
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if(progress != currentProgress){
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width:
                            window.innerWidth < 760 ? '10vw' : window.innerHeight < 1200 ? '10vw' : '4vw',
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        })
                    }
                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#AFAFAF'
                        })
                    }
                },
            });

            if(videoId == 0){
                anim.restart();
            }


            const animUpdate = () => {
                if (videoRef.current[videoId]) {
                    anim.progress(
                        videoRef.current[videoId]!.currentTime / hightlightsSlides[videoId].videoDuration
                    );
                }
            }

            if(isPlaying){
                gsap.ticker.add(animUpdate);
            }
            else{
                gsap.ticker.remove(animUpdate);
            }
        }
    },[videoId, startPlay])

    useEffect(() => {
        if (loadedData.length > 3) {
            const currentVideo = videoRef.current[videoId];
            if (currentVideo) {
                if (!isPlaying) {
                    currentVideo.pause();
                } else {
                    if (startPlay) {
                        currentVideo.play();
                    }
                }
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);


    const handleProcess = (type: string, index: number) => {
        switch(type){
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: index + 1}));
                break;
            case 'video-last':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo: true}));
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo: false, videoId: 0}));
                break;
            case 'pause':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}));
                break;
            case 'play':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}));
                break;
            default:
                return video;
        }
    }

    const handleLoadedMetaData = (e: Event, index: number) => setLoadedData((pre) => [...pre, e]);

    return(
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video 
                                    id='video' 
                                    className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                                    playsInline={true} 
                                    preload="auto" 
                                    muted 
                                    ref={(e) => (videoRef.current[index] = e)} 
                                    onPlay={()=> setVideo((prevVideo) => ({...prevVideo, isPlaying: true}))}
                                    onEnded={() => index !== 3 ? handleProcess('video-end', index) : handleProcess('video-last', index)}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(e, index)}
                                    >
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, index) => (
                                    <p key={index} className='md:text-2xl text-xl font-medium'>{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='relative flex-center mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                            ref={(e) => (videoDivRef.current[index] = e as HTMLDivElement | null)}
                        >
                        <span
                            className='absolute h-full w-full rounded-full'
                            ref={(e) => (videoSpanRef.current[index] = e)}
                        />
                        </span>
                        
                    ))}
                </div>
                <button className='control-btn'>
                    <img 
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                        alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} 
                        onClick={isLastVideo ? () => handleProcess('video-reset', 0) : !isPlaying ? () => handleProcess('play', 0) : () => handleProcess('pause', 0)}/>
                </button>
            </div>
        </>
    )
}