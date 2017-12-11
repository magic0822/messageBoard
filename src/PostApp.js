import React, {Component} from 'react'
import PostInput from './PostInput'
import PostList from './PostList'
import PropTypes from 'prop-types';
import loadData from './loadData'

import './bootstrap.min.css'

class PostApp extends Component{
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired

    };

    constructor(props) {
        super(props);
        localStorage.clear();
        this.state = {
            posts: props.data || []
        }
    }

    // detect user input, if empty will return the alert
    handleSubmitPost(p) {
        if (!p) return;
        if (!p.username) return alert('Please input user name.');
        if (!p.content) return alert('Please input post content.');
        if (!p.title) return alert('Please input title.');
        const posts = this.state.posts;
        posts.push(p);
        this.setState({posts});
        this.props.saveData(posts)
    }

    // bug
    handleDeletePost(index){
        const posts = this.state.posts;
        posts.splice(index, 1);
        this.setState({posts});
        this.props.saveData(posts)
    }

    render() {
        return (
            <div className='container align-content-center post-body'>
                <h1>Message Board</h1>
                <PostInput onSubmit={this.handleSubmitPost.bind(this)}/>
                <PostList
                    posts={this.state.posts}
                    onDeletePost={this.handleDeletePost.bind(this)}/>
            </div>
        )
    }
}

PostApp = loadData(PostApp, 'posts');
export default PostApp
