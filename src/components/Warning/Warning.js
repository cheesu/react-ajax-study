import React, {Component} from 'react';
import "./Warning.css";

class Warning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            closing: false
        };
    }

    componentWillReceiveProps (nextProps) {
        if(this.props.visible && !nextProps.visible) {
            // visible props is changing from true -> false
            this.setState({
                closing: true
            });

            // 1 sec after
            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 1000
            );
        }
    }


    render() {
        // message 값은 경고 메시지 텍스트를 설정하고 visible 은 컴포넌트의 가시성 (visibility) 를 설정해줍니다,
        const { message, visible } = this.props;
        const { closing } = this.state;
        if(!visible && !closing) return null;
        return (
            <div className="Warning-wrapper">
                <div className={`Warning ${closing?'bounceOut':'bounceIn'} animated`}>
                    {message}
                </div>
            </div>
        );
    }
}

export default Warning;