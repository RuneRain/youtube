import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export function formatAgo(data, lang='en_US'){
  return format(data,lang)
}
//외부에서 갖다 쓰려고 할 때 export 해주는 거.
//결과값이 나와야 할때가 리턴.
//lang 설정 안 할 수도 있으니까, lang='en_US'라고 기본 설정용을 따로 적어줌.

//단순한 시간을 ~얼마전으로 바꿔주는 함수
//https://www.npmjs.com/package/timeago.js/v/4.0.0-beta.3