var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "4AJOsdjk6LH15EkEYLCL2JQ7qDnuPhYv";

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {},
    };
  },

  handleSearch: function (searchingText) {
    this.setState({
      loading: true,
    });

    var self = this;
    this.getGif(searchingText)
      .then(function (gif) {
        self.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText,
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  },

  getGif: function (searchingText) {
    return new Promise(function (resolve, reject) {
      var url =
        GIPHY_API_URL +
        "/v1/gifs/random?api_key=" +
        GIPHY_PUB_KEY +
        "&tag=" +
        searchingText;
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText).data;
          var gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url,
          };
          resolve(gif);
        } else {
          reject(new Error(this.statusText));
        }
      };
      xhr.send();
    });
  },

  render: function () {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%",
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFów!</h1>
        <p>
          Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  },
});
