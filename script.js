import React from "https://esm.sh/react@18.2.0";

//create app component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote: ""
    };

    //JSON file that contains quotes
    this.JSON =
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";

    //bind the function to component
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }
  //after component is loaded to DOM
  componentDidMount() {
    //fetch a quote from JSON
    fetch(this.JSON)
      .then((data) => data.json())
      .then((quotes) =>
        this.setState({ quotes }, () => {
          this.setState({ quote: this.getRandomQuote() });
        })
      );
  }

  //function for random quote
  getRandomQuote = (e) => {
    let randomIndex = Math.floor(Math.random() * 100 - 1 + 1);
    this.setState({ quote: this.state.quotes[randomIndex] });
    return this.state.quotes[randomIndex];
  };

  render() {
    let twitterURL =
      "https://twitter.com/intent/tweet?text=" +
      this.state.quote.quote +
      " - " +
      this.state.quote.author;

    return (
      <div id="quote-box">
        <div id="text">"{this.state.quote.quote}"</div>
        <div id="author">-{this.state.quote.author}</div>
        <button id="new-quote" onClick={this.getRandomQuote}>
          New quote
        </button>
        <a
          id="tweet-quote"
          href={twitterURL}
          target="_blank"
          onClick={this.getRandomQuote}
        >
          <i class="fa-brands fa-square-twitter"></i>
          Tweet quote
        </a>
      </div>
    );
  }
}

//render react component to DOM
ReactDOM.render(<App />, document.getElementById("root"));
