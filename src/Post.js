import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        onDeletePost: PropTypes.func,
        index: PropTypes.number
    };

    constructor(){
        super();
        this.state = {timeString:''}
    }

    // post time will auto refresh and update in 3 secs
    componentWillMount(){
        this._updateTimeString();
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            3000
        )
    }

    // clear the timer to keep post time display 
    componentWillUnmount() {
        clearInterval(this._timer)
    }

    // post time will show in 'ago' style
    _updateTimeString(){
        const post = this.props.post;
        const duration = (+Date.now() - post.time) / 1000;
        this.setState({
            timeString: duration > 60
            ? `${Math.round(duration / 60)} mins ago`
            : `${Math.round(Math.max(duration, 1))} seconds ago`
        })
    }

    _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  	}

  	// delete button still has bugs..
    handleDeletePost(){
        if(this.props.onDeletePost){
            this.props.onDeletePost(this.props.index)
        }
    }

    render() {
        const post = this.props.post;
        return (
            <div className='container post'>
                <div className='row'>
                    <div className='col'>By:{post.username} </div>
                    <div className='col'>Title: {post.title}</div>
                    <div className='col'>
                        <button
                            className='btn btn-danger'
                            onClick={this.handleDeletePost.bind(this)}>Delete</button>
                    </div>
                    <div className="w-100"></div>

                    <div className='col-8' dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(post.content)
        }} />
                    <div className='col-4'>{this.state.timeString}</div>

                </div>
            </div>
        )
    }
}

export default Post