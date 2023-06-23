//실제 youtube로 연결
//옵션만 처리
//FakeYoutubeClient랑 youtubeClient 모두 youtube를 거쳐서 처리가 됨

export default class Youtube {
  constructor(apiClient){
    this.apiClient = apiClient;
  }

  async search(keyword){
    return keyword ? this.#searchByKeyword(keyword) : this.#popular()
  }

  //채널이미지(썸네일)을 가져오기 위해 필요한 옵션을 정의하는 함수
  async channelImageURL(id){
    return this.apiClient
    .channels({
        params:{
          part:'snippet',
          type:'video', //꼭 넣어줘야하는 부분. 안 그러면 중복된 콘텐츠가 나옴.
          id //id:id
        }
      })
      .then((res)=>res.data.items[0].snippet.thumbnails.default.url)
      /*items[0] 해준 이유 :
      channel.json 살펴보면, thumbnails의 링크가
      items > {} > snippet 형태로 되어있어서 = items[0].snippet 형태가 됨 */
  }

  //관련 비디오를 가져오기 위해 필요한 옵션을 정의하는 함수
  async realatedVideos(id){
    return this.apiClient
    .search({
        params:{
          part:'snippet',
          maxResults: 25, //한 페이지 내의 최대 갯수
          type:'video', //꼭 넣어줘야하는 부분. 안 그러면 중복된 콘텐츠가 나옴.
          relatedToVideoId:id
        }
      })
      .then((res)=>res.data.items)
      .then((items)=>items.map((item)=> ({...item, id: item.id.videoId })))
  }

  async #searchByKeyword(keyword){
    return this.apiClient
    .search({
        params:{
          part:'snippet',
          maxResults: 25, //한 페이지 내의 최대 갯수
          type:'video', //꼭 넣어줘야하는 부분. 안 그러면 중복된 콘텐츠가 나옴.
          q:keyword,
          regionCode:'US'
        }
      })
      .then((res)=>res.data.items)
      .then((items)=>items.map((item)=> ({...item, id: item.id.videoId })))
  }

  async #popular(){
    return this.apiClient
    .videos({ 
        params:{
          part:'snippet',
          maxResults: 10,
          chart:'mostPopular',
          regionCode:'KR'
        }
      })
      .then((res)=>res.data.items)
  }
}
/*
realatedVideos랑 searchByKeyword은 다른 건 동일한데, 
relatedToVideoId랑 q 부분만 다름
*/