import React, {Component} from 'react';
import PropTypes from 'prop-types';
import loadData from './loadData'

class PostInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            username: props.data || '',
            content: '',
        }
    }

    componentDidMount() {
        this.textarea.focus();
    }

    handleTitleBlur(e) {
        this.props.saveData(e.target.value)
    }

    // store user name and no need to input every time
    handleUsernameBlur(e) {
        this.props.saveData(e.target.value)
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleContentChange(e) {
        this.setState({
            content: e.target.value
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                title: this.state.title,
                time: +new Date()
            })
        }
        this.setState({content: '', title: ''});
    }

    render() {
        return (
            <div className='container post-list'>
                <h2>Create a new Post</h2>
                <div className='container'>
                    <div className='input-group-addon'>Title：</div>
                    <div className='input-group'>
                        <input className='form-control'
                               onBlur={this.handleTitleBlur.bind(this)}
                               value={this.state.title}
                               onChange={this.handleTitleChange.bind(this)}/>
                    </div>
                </div>
                <div className='container'>
                    <div className='input-group-addon'>Message：</div>
                    <div className='input-group'>
                        <textarea
                            className='form-control'
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='container'>
                    <div className='input-group-addon'>User：</div>
                    <div className='input-group'>
                        <input className='form-control'
                               onBlur={this.handleUsernameBlur.bind(this)}
                               value={this.state.username}
                               onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className=''>
                    <button className='btn btn-success' onClick={this.handleSubmit.bind(this)}>
                        Post
                    </button>
                </div>
            </div>
        )
    }
}

PostInput = loadData(PostInput, 'username')
export default PostInput