import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useYoutubeApi } from '../context/YoutubeApiContext'
import VideoCard from './VideoCard'

export default function RealatedVideos({id}) { //{}구조분해

  const {youtube} = useYoutubeApi();//함수 사용

  const { 
    isLoading, //로딩, 에러 여부
    error, 
    data:videos 
  } = useQuery(['related', id], ()=> youtube.realatedVideos(id),{staleTime:1000*60*10})

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>🚨 에러발생 🚨</p>}

      {videos && ( 
        <ul>
          {/* flex로 놓아도 되는데, grid가 좀 더 깔끔해서 그리드로 해줌
          sm,lg,xl,2xl 사이즈 지정/ grid-cols는 가로로 이미지 보일 갯수/
          gap은 축에 따른 여백/ p는 padding
          */}
          {videos.map((video)=>(
            <VideoCard key={video.id} video={video} type="related" />
            /* type="related" 구분용으로 넣어줌 */
          ))}
        </ul>
      )}
    </>
  )
}
