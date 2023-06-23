//실제 youtube로 연결
//연결하는 부분만 처리

import axios from 'axios';

export default class YoutubeClient {
  constructor(){
    this.httpClient = axios.create({
      baseURL : 'https://youtube.googleapis.com/youtube/v3',
      params:{key:process.env.REACT_APP_YOUTUBE_API_KEY}
    })
  }

  //params를 전달받는 역할만 함
  async search(params){
    return this.httpClient
    .get('search', params)
  }
  async videos(params){
    return this.httpClient
    .get('videos', params)
  }
  async channels(params){ //videos.jsx에서 가져온 이름과 맞춰줌
    return this.httpClient
    .get('channels', params)
    //상단의 baseURL : 'https://youtube.googleapis.com/youtube/v3' 뒤에 나오는 부분.
    //baseURL+channels 형태의 주소가 되는 것.
  }
}