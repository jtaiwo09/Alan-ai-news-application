import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import alanLogo from './images/alanLogo.jpg';
import wordsToNumbers from 'words-to-numbers';

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  const alanKey = 'd283499da95feef62597f07d25a4f7f42e956eca572e1d8b807a3e2338fdd0dc/stage';
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number })=> {
        if(command === 'newsHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if(command === 'highlight'){
          setActiveArticle(prevActiveArticle => prevActiveArticle + 1)
        } else if(command = 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[parsedNumber - 1];
          if(parsedNumber > 20){
            alanBtn().playText('Pleas try that again');
          } else {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...')
          }
        }
      }
    })
  }, []);

  return (
    <>
    <div className={classes.logoContainer}>
      <img src={alanLogo} alt="alan Logo" className={classes.alanLogo}/>
    </div>
    <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </>
  );
}

export default App;
