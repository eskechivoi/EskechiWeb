import React from 'react';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

const Article = ({ language, category, text, pdfLink, pdfId, onOpen, onClose, isVisible }) => {
    const downloadText = language === 'ES' ? 'Link de descarga [PDF]' : 'Download link [PDF]';
    return (
        <tbody>
            <tr>
                <td><p className="articles-txt" style={{textAlign: 'left'}}>[{language}] [{category}]: {text}</p></td>
                <td><a href={pdfLink}>{downloadText}</a></td>
                <td id={`open-${pdfId}`} onClick={() => onOpen(pdfId)} style={{ display: isVisible ? 'none' : 'block'}}>
                    <IonIcon icon={eyeOutline} className="eye" />
                </td>
                <td id={`close-${pdfId}`} onClick={() => onClose(pdfId)} style={{ display: isVisible ? 'block' : 'none' }}>
                    <IonIcon icon={eyeOffOutline} className="eye" />
                </td>
            </tr>
        </tbody>
    );
};

export default Article;