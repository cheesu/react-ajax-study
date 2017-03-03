import React, {Component} from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
//다음 코드는 services의 post.js 에서 export 한 함수를 모두 불러와서 service 안에 담습니다.
import * as service from '../../services/post';

class PostContainer extends Component {

    constructor(props) {
        super();
        // initializes component state
        //postId 값은 현재 포스트의 번호를 가르키고, fetching 은 요청의 완료 여부를 알려줍니다.
        this.state = {
            postId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            post: {
                title: null,
                body: null
            },
            comments: [],
            warningVisibility: false
        };
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

/*
* 컴포넌트의 메소드가 만들어지는데에 화살표 함수가 사용되었습니다. 일반적인 방식으로는 컴포넌트에서 메소드 선언을 다음과 같은 방식으로 하죠.

 class MyComponent extends Component {
    constructor(props) {
        super();
        this.myMethod = this.myMethod.bind(this);
    }
    myMethod() { ... }
    render() { ... }
 }
 보시다시피 메소드에서 this 에 접근하기 위해 constructor 에서 bind 를 해주었습니다.
 하지만! 만약에 화살표 함수로 메소드를 선언해주면, binding 을 따로 하지 않아도 자동으로 됩니다.
 이는 babel 플러그인 transform-class-properties 가 적용되어있기 때문,
  create-react-app 으로 만든 프로젝트는 자동으로 적용이 되어있다.
* */

/* async-await 사용함 - 비동기 작업을 동기작업 하듯 코드를 작성 할 수 있게 해줌 하지만 코드는 비동기적으로 작동함
 await 키워드는 Promise 를 기다려주는 역할을합니다.
 그리고, 이 키워드를 사용하는 함수는 다음과 같이 함수를 선언 할 때 async 키워드가 함수 앞에 붙어있어야합니다.
 */

/*
이렇게 짜면 좀 비효율적임. 첫번째 요청 기다린 다음 두번째 요청을 기다림

    fetchPostInfo = async (postId) => {
        const post = await service.getPost(postId);
        console.log(post);
        const comments = await service.getComments(postId);
        console.log(comments);
    }
*/

// 이렇게 짜면 첫번째 두번째 요청 같이함
    /*
    * 여러개의 Promise 를 한꺼번에 처리하고 기다릴 때는, Promise.all 을 사용하면 됩니다.
     Promise.all 에 promise 의 배열을 전달해주면, 결과값으로 이뤄진 배열을 반환합니다.
     */
    fetchPostInfo = async (postId) => {
    //요청이 시작하기 전에 fetch 값을 true 로 설정합니다. 요청이 끝난다음엔 false 로 설정하고, postId 값도 설정해줍니다.
        this.setState({
            fetching: true // requesting..
        });
        try {
            // wait for two promises
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId)
            ]);
            console.log(info);
            // Object destructuring Syntax,
            // takes out required values and create references to them
            /*const { a, b } = c 의 형식의 코드는 ES6 의 Object Destructuring (객체 비구조화 할당)문법입니다.
             필요한 값을 객체에서 꺼내서, 그 값을 가지고 레퍼런스를 만들어주죠.
             */
            const {title, body} = info[0].data;
            const comments = info[1].data;
            this.setState({
                postId,
                post: {
                    title,
                    body
                },
                comments,
                fetching: false // done!
            });
        } catch(e){
            // if err, stop at this point
            this.setState({
                fetching: false
            });
            this.showWarning();
            console.log('error occurred', e);
        }
    }

    // 경고창 보여주는 메소드
    showWarning = () => {
        this.setState({
            warningVisibility: true
        });
        // after 1.5 sec
        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                });
            }, 1500
        );
    }

    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if(type === 'NEXT') {
            this.fetchPostInfo(postId+1);
        } else {
            this.fetchPostInfo(postId-1);
        }
    }

/*
* 이 코드에서도, state 부분에 비구조화 할당 문법을 사용했습니다. 이렇게 함으로 서,
* this.state.post.title 이렇게 해야되는거를 바로 post.title 로 할 수 있으니까 훨씬 보기 편하지 않나요?
 <Navigate/> 컴포넌트엔 현재 포스트의 번호를 알려줄 postId,
 그리고 데이터를 불러오는 중일 땐 버튼을 비활성화 하도록 fetching 값을 disabled 로 전달하도록 설정하였습니다.
 <Post/> 컴포넌트엔 post 의 정보를 info 로 전달해주고, 덧글 리스트를 담고 있는 comments 도 전달 해 주었습니다.
* */
    render() {
        const {postId, fetching, post, comments, warningVisibility} = this.state;

        return (
            <PostWrapper>
                <Navigate
                    postId={postId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post
                    postId={postId}
                    title={post.title}
                    body={post.body}
                    comments={comments}
                />
                <Warning visible={warningVisibility} message="더 없다~"/>
            </PostWrapper>
        );
    }
}

export default PostContainer;