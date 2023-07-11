import { useParams } from 'react-router-dom';
import articles from './article-content';

const ArticlePage = () => {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    return (
        <>
            {article ?
                <>
                    <h1>{article.title}</h1>
                    {article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </>
                : <h1>Oops article not found!</h1>}

        </>
    )
}

export default ArticlePage;