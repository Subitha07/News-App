import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

function NewsBoard({category}) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then(response =>{
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) =>  setArticles(data.articles))
      .catch(error => {
        console.error(error);
      });
  }, [category]);
  return (
    <div style={{background:"rgb(239, 182, 230)"}}>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.map((news,index)=>{
        return <NewsItem key={index}
        title={news.title}
        description={news.description}
        src={news.urlToImage}
        url={news.url}/>
      })}
    </div>
  );
}

export default NewsBoard;
