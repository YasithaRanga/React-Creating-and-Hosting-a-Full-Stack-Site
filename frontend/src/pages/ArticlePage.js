import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`http://localhost:9000/api/articles/${articleId}`);
            setArticleInfo(response.data);
        }
        loadArticleInfo();
    }, [])

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`http://localhost:9000/api/articles/${articleId}/upvote`);
        setArticleInfo(response.data);
    }

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className='upvotes-section'>
                {user
                    ? <button onClick={addUpvote}>Upvote</button>
                    : <button >Log in to upvote</button>
                }
                <p>This article has {articleInfo.upvotes} upvote(s).</p>
            </div>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            {user
                ? <AddCommentForm articleId={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                : <button >Log in to add comment</button>
            }
            <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage;