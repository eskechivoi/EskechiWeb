import React, { useState, useEffect } from 'react';
import PdfArticleRow from './pdfArticles/PdfArticleRow';
import MarkdownArticleRow from './mdArticles/MarkdownArticleRow';

const Articles = ({ articles }) => {
	const [visiblePdf, setVisiblePdf] = useState(null);

	const openPdf = (pdfId) => {
		setVisiblePdf(pdfId);
	};

	const closePdf = (pdfId) => {
		setVisiblePdf(null);
	};

	useEffect(() => { 
		const handleResize = () => { 
			if (window.innerWidth < 1500) { setVisiblePdf(null); } 
		}; 
		window.addEventListener('resize', handleResize); 
		return () => { 
			window.removeEventListener('resize', handleResize); 
		}; 
	}, []);

	return (
		<div>
			<h1 style={{ marginTop: '50px', textAlign: 'center' }}>Articles</h1>
			<hr className="hr-socials" />
			<table className="table table-hover">
			<tbody>
				{articles.map((article, index) => (
				article.pdfLink ? (
					<PdfArticleRow
						key={index}
						language={article.language}
						category={article.category}
						text={article.text}
						pdfLink={article.pdfLink}
						pdfId={`pdf-${index}`}
						onOpen={openPdf}
						onClose={closePdf}
						isVisible={visiblePdf === `pdf-${index}`}
					/>
				) : (
					<MarkdownArticleRow
						key={index}
						language={article.language}
						category={article.category}
						text={article.text}
						mdName={article.mdName}
					/>
				)
				))}
			</tbody>
			</table>
			{articles.map((article, index) => (
				<iframe
					key={index}
					id={`pdf-${index}`}
					className="pdf"
					src={article.pdfLink}
					style={{ display: visiblePdf === `pdf-${index}` ? 'block' : 'none' }}
				></iframe>
			))}
		</div>
	);
};

export default Articles;
