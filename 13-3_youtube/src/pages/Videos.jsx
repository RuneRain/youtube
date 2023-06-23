import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext'
//import { search } from '../api/youtube';
//import FakeYoutube from '../api/fakeYoutube';
//import Youtube from '../api/youtube'

export default function Videos() {
  const { keyword } = useParams();
  const {youtube} = useYoutubeApi();
  //context 파일에서 만들어놓은 함수를 가져와서 사용

  //const ctx = useContext(YoutubeApiContext);

  const { 
    isLoading, //로딩, 에러 여부
    error, 
    data:videos 
  } = useQuery(['videos',keyword], ()=> youtube.search(keyword))
  //쿼리값, 불러오는 함수
  // = useQuery(['videos',keyword], ()=> ctx.search(keyword))
  /* const {youtube} = useYoutubeApi();에서 불러와서 
  const { 
    isLoading, 
    error, 
    data:videos 
  } = useQuery(['videos',keyword], ()=> youtube.search(keyword))
  에서 인용하는 형태
  */

  /*const youtube = new FakeYoutube();
    const youtube = new Youtube();
    return youtube.search(keyword);
  })*/
  //youtube 변수를 YoutubeApiContext로 이동시켰음
  /*
    const { isLoading, error, data } = useQuery([],fnc,options)
  */

  //console.log('videos ? ', videos)
  return (
    <div className='w-full max-w-screen-2xl m-auto'>
      {/*평소에는 가로 100%(w-full),중앙에 배치(m-auto) -> 1536px 이상은 안 커짐*/}
      <div>Videos - { keyword ? ` 🔍 ${keyword}` : '🔥인기동영상'} </div>
      {/* keyword가 있을때 / 없을때  */}

      {isLoading && <p>Loading...</p>}
      {error && <p>🚨 에러발생 🚨</p>}

      {videos && ( 
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6 p-4'>
          {/* flex로 놓아도 되는데, grid가 좀 더 깔끔해서 그리드로 해줌
          sm,lg,xl,2xl 사이즈 지정/ grid-cols는 가로로 이미지 보일 갯수/
          gap은 축에 따른 여백/ p는 padding
          */}
          {videos.map((video)=>(
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
  </div>
  )
}
/*
youtube의 경우에는 사진+문구를 div로 한 번 감싸고 그 위에 사진부분만 한 번 더 감싼 상태
그래서 위아래
*/