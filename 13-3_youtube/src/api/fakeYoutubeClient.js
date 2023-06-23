//내부 json로 연결 - 실제 유튜브 API를 가져올 수가 없음(사용제한)

import axios from 'axios';

export default class FakeYoutubeClient {

  async search({params}){//youtube.js에서 가져옴
    //return params.relatedToVideoId 
    //? axios.get(`/videos/related.json`)
    //: axios.get(`/videos/search.json`)
    //relatedToVideoId가 있음 related, 없음 search 가져오게
    
    //중복되는 부분이 있으니까, 방식을 바꿔서
    return axios.get(`/videos/${params.relatedToVideoId ? 'related' : 'search'}.json`)
  }

  async videos(){
    return axios.get(`/videos/popular.json`)
  }

  async channels(){
    return axios.get(`/videos/channel.json`)
  }
}





/*
export async function search(keyword) {
  return axios
    .get(`/videos/${keyword ? 'search' : 'popular'}.json`)
    .then((res)=>res.data.items)
*/



