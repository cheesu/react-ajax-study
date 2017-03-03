import React from 'react';
import './Header.css';
/*
* 이런 형식으로 선언된 컴포넌트는 함수형 컴포넌트 (Functional Component) 라고 부릅니다. 만약에 state 가 없고,
 * life cycle 메소드가 필요없는 멍청한 컴포넌트라면, 함수형 컴포넌트로 선언을 하는것이 좋은 패턴입니다.
 * 보기에도 깔끔하고, 컴포넌트의 로직을 컴포넌트 바깥으로 옮기므로, 나중에 테스팅하기에도 편하죠.
 함수형 컴포넌트는 this 에 접근하는것이 불가능하며, lifeCycle api 들을 사용하는것이 불가능합니다.
 함수형 컴포넌트는 오직 전달받는 props 에만 의존합니다.
* */
const Header = () => (
    <div className="Header">
        cheesu's Post prj test
    </div>
)

export default Header;