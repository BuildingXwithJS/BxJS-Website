import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import React from 'react';
import Article from '../components/article';
import {getArticlesByKeyword, getKeywords} from '../components/explore';
import Navbar from '../components/navbar';

export default class Explore extends React.Component {
  static async getInitialProps({query}) {
    const keywords = await getKeywords();
    const currentWord = query.word;
    let articles;
    if (currentWord && currentWord.length > 0) {
      articles = await getArticlesByKeyword(currentWord);
    }
    return {keywords, currentWord, articles};
  }

  render() {
    const {keywords, currentWord, articles} = this.props;

    return (
      <div className="container">
        <style jsx>{`
          .keywords {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: auto;
          }

          .keywords-card {
            margin-top: 10px;
            height: 200px;
          }

          .articles {
            display: flex;
            flex-direction: column;
          }
        `}</style>

        <Navbar />

        <div className="section content">
          <h2>Explore BxJS content</h2>

          {currentWord && currentWord.length && <h3>Browsing keyword "{currentWord}"</h3>}

          <div className="columns">
            <div className="card keywords-card column is-one-third">
              <div className="card-content keywords">
                {keywords.map(({keyword, count}) => (
                  <div className="keyword">
                    <Link href={`/explore/keyword/${keyword}`}>
                      <a className="navbar-item">
                        <span className="tag is-light">
                          {keyword} [{count}]
                        </span>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="column articles">
              {articles.map(article => (
                <Article data={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
