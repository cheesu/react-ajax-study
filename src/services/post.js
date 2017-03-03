import axios from 'axios';

export function getPost(postId) {
    return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}
/*
* ${...} 은 무슨 표현이죠?
 위 표현은 ES6 의 Template Literal 이라는 문법입니다. 문자열 내부에 변수를 넣을 때 사용합니다.
 주의 하실 점은 문자열을 감싸는 따옴표가 숫자 1키 왼쪽에있는 키 입니다
* */
export function getComments(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}