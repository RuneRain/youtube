import React from 'react';
import {useNavigate} from 'react-router-dom'
//import { format, register } from 'timeago.js';
//import koLocale from 'timeago.js/lib/lang/ko';
import { formatAgo } from '../util/date';
//한글 lang 패키지 import 해 줌.

export default function VideoCard({video, type}) {
  //const {중복 제외되는 부분의 맨 앞} = 중복되는 부분;
  const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
  //register('my-locale', localeFunc);
  //사용하고자 하는 언어, 사용하고자 하는 언어+Locale

  const navigate = useNavigate();
  const isRelated = type === 'related';
  //RealatedVideos에서 가져옴
  //페이지 많을 걸 가정한 것. 블린값만 해도 된다면 안 써줘도 되는 부분

  return (
    <li className={isRelated ? 'flex gap-x-4 mb-4 cursor-pointer' : 'cursor-pointer'} onClick={()=>{navigate(`/videos/watch/${video.id}`,{state:{video}})}}>
      {/* navigate가 링크 해주면서, 옵션으로 여기에서의 state는 상태(객체)까지 같이 전달해줌.
      state:{video:video} 앞 뒤 동일에서 하나만 써줬음. 원래는 aa:video 이렇게 써도 되는 부분.
      video 안의 id가 중요. 지정 url 뒤에 추가되어 내용 변경을 도와줌 */}
      <img className={isRelated ? 'w-40 rounded-xl' : 'w-full rounded-xl'} src={thumbnails.medium.url} alt={title} />
      <div>
        <p className={
          isRelated 
          ? 'text-base mt-0 mb-1 leading-4 line-clamp-2'
          : 'text-lg mt-3 mb-1 leading-6 line-clamp-2'}>{channelTitle}</p>
        {/* leading-6 = line-hight. 3부터 시작함
        line-clamp-2 나오는 게 최대 2줄로 바꿔줌. 버전 높아서, 버전 가림.*/}
        <p className= {
          isRelated
          ? 'text-xs opacity-80'
          : 'text-xs opacity-80'}>{channelTitle}</p>
        <p className={
          isRelated
          ? 'text-xs opacity-50'
          : 'text-xs opacity-50'}>{formatAgo(publishedAt,'ko')}</p>
      </div>
    </li>
  )
}
/*
+ icon과 조회수는 api 따로 더 가져와야되서, 여기에서는 생략함.

여기서 video.snippet.부분이 자꾸 반복됨. 위에서 재선언+정리해줌
<li>
<img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
<div>
  <p>{video.snippet.title}</p>
  <p>{video.snippet.channelTitle}</p>
  <p>{video.snippet.publishedAt}</p>
</div>
</li>
*/