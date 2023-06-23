import { createContext, useContext } from "react";
import Youtube from '../api/youtube'
import YoutubeClient from "../api/youtubeClient";
//import FakeYoutubeClient from "../api/fakeYoutubeClient";

export const YoutubeApiContext = createContext();

//const client = new FakeYoutubeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client)

/* Context가 적용될 영역 지정하는 함수 */
export function YoutubeApiProvider({children}){
  return(
    <YoutubeApiContext.Provider value={{youtube}}>
      {children}
    </YoutubeApiContext.Provider>
  )
}
export function useYoutubeApi(){
  return useContext(YoutubeApiContext)
}