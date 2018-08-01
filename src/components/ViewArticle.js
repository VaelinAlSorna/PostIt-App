import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import CommentArticle from './CommentArticle';
import CommentList from './CommentList';
import { IoIosHeart } from "react-icons/io";
import { addLike ,commentArticle, removeComment } from '../actions/articlesActions'; 

export class ViewArticle extends React.Component {
    onSubmit = (comment) => {
        this.props.commentArticle(this.props.article.id ,comment);
    }
    onClickDeleteComment = (commentId) => {
        this.props.removeComment(this.props.article.id, commentId);
    }
    onClickLike = () => {
        const userId = uuid();
        this.props.addLike( this.props.article.id ,userId);
    }
    render() {
        return (
            <div>
                {
                    !!this.props.article ? (
                        <div>
                            <Link to={`/edit/${this.props.article.id}`}>Edit Article</Link>
                            <h2>{this.props.article.title}</h2>
                            <p>{this.props.article.createdAt}</p>
                            <p>{this.props.article.text}</p>
                            <CommentArticle onSubmit={this.onSubmit} />
                            <button onClick={this.onClickLike}> <IoIosHeart /></button>
                            <CommentList onClickDeleteComment={this.onClickDeleteComment} comments={this.props.article.comments}/>
                        </div> 
                    ) : (
                        <h2> This article doesn't exist! </h2>
                    )
                }
            </div>
        );
    };
};

const mapStateToProps = (state, props) =>({
    article: state.articles.find((article) => article.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
   addLike: (id, userId) => dispatch(addLike(id, userId)),
   commentArticle: (id, comment) => dispatch(commentArticle(id, comment)),
   removeComment: (id, commentId) => dispatch(removeComment(id, commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);