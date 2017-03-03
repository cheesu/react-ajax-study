import React from 'react';
import './PostWrapper.css'

/*
* 함수의 파라미터로는 children 을 받습니다. 이 값은, 클래스형태로 할 때의 this.props.children 과 동일합니다.
* 컴포넌트를 사용 할 때
* <Component>여기에 있는 내용이 children 입니다</Component>
* */

const PostWrapper = ({children}) => {
    return (
        <div className="PostWrapper">
            {children}
        </div>
    );
};

export default PostWrapper;