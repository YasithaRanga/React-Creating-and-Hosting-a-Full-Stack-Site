import { useState } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(`http://localhost:9000/api/articles/${articleId}/comments`, {
            postedBy: name,
            text: commentText,
        },
            { headers });
        onArticleUpdated(response.data);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user ? <p>You are posting as {user.email}</p> : ''}
            <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                rows="4"
                cols="50"
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
};

export default AddCommentForm;