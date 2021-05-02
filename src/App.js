import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import alanLogo from './images/alanLogo.jpg';
import wordsToNumbers from 'words-to-numbers';
import { Typography } from '@material-ui/core';

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
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
          if(parsedNumber > articles.length){
            alanBtn().playText('Pleas try that again...');
          } else if(article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...')
          }
        }
      },
    });
  }, []);

  return (
    <>
    <div className={classes.logoContainer}>
      {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
      <img src={alanLogo} alt="alan-Logo" className={classes.alanLogo}/>
    </div>
    <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </>
  );
}

export default App;
