import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `News - ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    //run after render method
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    console.log("previous");
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page:this.state.page+1});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "90px 0px 13px 0px" }}>
          News - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner />}>

            <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 80): ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
