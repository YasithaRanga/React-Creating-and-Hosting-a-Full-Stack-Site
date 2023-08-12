import { useState } from 'react';
import axios from 'axios';

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const response = await axios.post(`http://localhost:9000/api/articles/${articleId}/comments`, {
            postedBy: name,
            text: commentText,
        });
        onArticleUpdated(response.data);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
            </label>
            <label>
                Comment:
                <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4"
                    cols="50"
                />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
};

export default AddCommentForm;