import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useYoutubeApi } from '../context/YoutubeApiContext'

export default function ChanneInfo({id, name}) {
    //youtube.js에서 불러와준 id
    //name은 아까 하단에서 불러와서 그냥 보여주기만...
    //채널이름:{id} / name:{name} 여기에서.

    const {youtube} = useYoutubeApi();
    //videos에 있는 거랑 이름 맞춰줌

    const {data:url} = useQuery(['channel',id], ()=> youtube.channelImageURL(id),{staleTime:1000*60*10})
    //1초 = 1000밀리세컨 , 1분 = 1000*60, 10분 = 1000*60*10
    //10분간은 캐시된 걸 쓰겠다는 의미
    
    //해당 페이지 열리면 context랑 useYoutubeApi이 연결됨
    //channelImageURL에서 id를 보내줌
    //apiClient > channels 안에 있는 인자에 주소값이 나옴.
    //data:url은 img

  return (
    <div className='flex my-4 items-center'>
      {/* 채널이름:{id} / name:{name}
      내용 들어가는지 확인용 */}

      {url && <img src={url} alt={name} />}
      {/* 이미지가 있을 때만 불러옴. 이미지 옆에 하단의 네임과 동일한 내용이 적혀있다면,
       alt={name} 설정해 준 부분 때문임 */}

      <p>{name}</p>
      {/* 만약 액박(이미지 깨짐현상) 뜬다면, 제대로 연결은 됐으나 fakeYoutubeClient
      즉, 내부 json에 연결되어 있기 때문임 */}
    </div>
  )
}