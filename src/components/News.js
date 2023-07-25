import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9e5871124af64458af7fbb98b384760d";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }
  handleOnNext = async () => {
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9e5871124af64458af7fbb98b384760d&page=${
      this.state?.page + 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };
  handleOnPrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9e5871124af64458af7fbb98b384760d&page=${
      this.state.page - 1
    }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ page: this.state.page - 1, articles: parsedData.articles });
  };
  render() {
    return (
      <>
        <div className="container my-4">
          <h2 className="mb-3 text-center">NewsBuddy-Top heading</h2>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 25) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 50)
                        : ""
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.coindesk.com/resizer/XCmt3EpTax3DgBl4jF9U3a7BcBI=/1200x628/center/middle/cloudfront-us-east-1.images.arcpublishing.com/coindesk/CJUWDGYEFREJJCBOZEN26K3YDE.jpg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleOnNext}
          >
            &larr; Pravious
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleOnNext}
          >
            &rarr; Next
          </button>
        </div>
      </>
    );
  }
}

export default News;
