import ArticleRow from '../ArticleRow';

const MarkdownArticleRow = ({ language, category, text, mdName }) => {
const downloadText = language === 'ES' ? 'Link al artículo' : 'Link to the article';

  return (
    <ArticleRow language={language} category={category} text={text}>
        <td><a href={`/articles/${mdName}`}>{downloadText}</a></td>
        <td></td>
    </ArticleRow>
  );
};

export default MarkdownArticleRow;
