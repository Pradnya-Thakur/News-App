import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
            <div className="card" >
            <img src={imageUrl?imageUrl:'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2023/03/GarageBand-Mac.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1'} className="card-img-top" alt="..." />
            <div className="card-body">
            
            <p className="card-text font-weight-bold">{title}</p>
            <p className="card-text"><small className="text-muted">By {source ? source : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}
