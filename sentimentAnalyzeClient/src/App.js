import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';

class App extends React.Component {
  /*
  We are setting the component as a state named innercomp.
  When this state is accessed, the HTML that is set as the 
  value of the state, will be returned. The initial input mode
  is set to text
  */
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: true
  }

  /*
  This method returns the component based on what the input mode is.
  If the requested input mode is "text" it returns a textbox with 4 rows.
  If the requested input mode is "url" it returns a textbox with 1 row.
  */

  renderOutput = (input_mode) => {
    let rows = 1
    let mode = "url"
    //If the input mode is text make it 4 lines
    if (input_mode === "text") {
      mode = "text";
      rows = 4;
    }
    this.setState({
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
      sentimentOutput: "",
      sentiment: true
    });
  }

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let url = ".";
    let mode = this.state.mode
    url = url + "/" + mode + "/sentiment?" + mode + "=" + document.getElementById("textinput").value;

    fetch(url)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          this.setState({ sentimentOutput: data.label });
        })
      }
      else {
        response.json().then(err => alert("Error: " + err.error));
      }
    })
    .catch(err => console.error("Error: " + err));
  }

  sendForEmotionAnalysis = () => {

    this.setState({ sentiment: false });
    let url = ".";
    let mode = this.state.mode
    url = url + "/" + mode + "/emotion?" + mode + "=" + document.getElementById("textinput").value;

    fetch(url)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
        })
      }
      else {
        response.json().then(err => alert("Error: " + err.error));
      }
    })
    .catch(err => console.error("Error: " + err));
  }


  render() {
    return (
      <>
        <div className='container m-auto pt-5 pb-2'>
          <div className='row d-flex justify-content-center'>
            <span className="w-auto display-1 text-bg-light fst-italic shadow p-3 mb-5 rounded">Sentiment Analyzer <sup>2.0</sup></span>
          </div>
        </div>
        <div className="container m-auto">
          <div className="App">
            <div className='row mb-2'>
              <div className='col d-flex justify-content-end'>
                <button className={this.state.mode === "text" ? "btn btn-info" : "btn btn-dark"} onClick={() => { this.renderOutput('text') }}>Text</button>
              </div>
              <div className='col d-flex justify-content-start'>
                <button className={this.state.mode === "url" ? "btn btn-info" : "btn btn-dark"} onClick={() => { this.renderOutput('url') }}>URL</button>
              </div>
            </div>
            <div className='row d-flex justify-content-center mb-2'>
              <span className='w-auto'>{this.state.innercomp}</span>
            </div>
            <div className='row mb-2'>
              <div className='col d-flex justify-content-end'>
                <button className="btn btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
              </div>
              <div className='col d-flex justify-content-start'>
                <button className="btn btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
              </div>
            </div>
            <div className='row d-flex justify-content-center mb-2'>
              {
                this.state.sentimentOutput && this.state.sentimentOutput === "positive"
                  ?
                  <span className="display-2 text-success">{this.state.sentimentOutput}</span>
                  :
                  null
              }
              {
                this.state.sentimentOutput && this.state.sentimentOutput === "negative"
                  ?
                  <span className="display-2 text-danger">{this.state.sentimentOutput}</span>
                  :
                  null
              }
              {
                this.state.sentimentOutput && this.state.sentimentOutput === "neutral"
                  ?
                  <span className="display-2 text-warning bg-dark">{this.state.sentimentOutput}</span>
                  :
                  null
              }
              {
                !this.state.sentiment && this.state.sentimentOutput && typeof (this.state.sentimentOutput) !== "string"
                  ?
                  <>
                    {this.state.sentimentOutput}
                  </>
                  :
                  null
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
