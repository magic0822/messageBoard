import React, {Component} from 'react'
import Post from './Post'
import PropTypes from 'prop-types';

class PostList extends Component {
    static propTypes = {
        posts: PropTypes.array,
        onDeletePost: PropTypes.func
    };

    static defaultProps = {
        posts: [],
    };

    // bug
    handleDeletePost(index){
        if(this.props.onDeletePost){
            this.props.onDeletePost(index)
        }
    }

    render() {
        return (
            <div>
                {this.props.posts.map((post, i) =>
                    <Post
                        post={post}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeletePost.bind(this)}/>
                )}
            </div>
        )
    }
}

export default PostList