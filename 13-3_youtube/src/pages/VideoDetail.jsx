import React from 'react';
import ChannelInfo from '../components/ChannelInfo';
import { useLocation } from 'react-router-dom';
import RealatedVideos from '../components/RealatedVideos';

export default function VideoDetail() {
  
  //const aa = useLocation(); //useLocation 주소 받아옴
  //console.log('aa??',aa)
  //이렇게 되면 방대하게 가져옴. 이중에서 video만 가져오려고 따로 선언
  const {state:{video}} = useLocation();
  //console.log('video??',video)
  const {title, channelTitle, channelId, description} = video.snippet;
  const wrap = {
    position: 'relative', paddingBottom:'56.25%', paddingTop:0, height:0, overflow:'hidden'
  }
  const iframe = {
    position:'absolute', top:0, left:0, width:'100%', height:'100%'
  }

  return (
    <section className='flex flex-col lg:flex-row p-4 gap-x-4'>
      <article className='basis-2/3 mb-6'>
        <div style={wrap}>
          <iframe id="player" type="text/html" width="100%" height="640" style={iframe}
          src={`https://www.youtube.com/embed/${video.id}`} title={title} />
          {/* frameborder="0" 부분은 지워줄 것. 이것때문에 경고창 뜨기도 함
          깃허브에 올릴 때, https 인지 체크해주고 올릴 것. 안 그러면 에러남.
          {}는 프로그램요소 들어가서 해주는 부분 */}
        </div>
        <div>
          <h2 className='text-2xl font-bold pt-4'>{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <div className=' h-48 bg-zinc-800 overflow-y-auto p-2 rounded-xl'>
            <pre className='whitespace-pre-wrap'>{description}</pre>
          </div>
        </div>
      </article>

      <aside className='basis-1/3'>
        <RealatedVideos id={video.id} />
      </aside>
    </section>
  )
}
/* 댓글은 따로 api 가져와야 함 */