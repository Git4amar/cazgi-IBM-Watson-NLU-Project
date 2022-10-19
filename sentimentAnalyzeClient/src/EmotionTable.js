import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    //Returns the emotions as an HTML table
    const emotionsData = Object.entries(this.props.emotions);
    emotionsData.sort(
      (a, b) => { return b[1] - a[1] }
    );
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr className='text-bg-info display-4'>
              <td>Emotion</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {
              /*Write code to use the .map method that you worked on in the 
              Hands-on React lab to extract the emotions. If you are stuck,
              please click the instructions to see how to implement a map*/
              emotionsData.map((emotion, index) => {
                return (
                  <tr key={emotion[0] + index}>
                    <td>{emotion[0]}</td>
                    <td>{emotion[1]}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}
export default EmotionTable;
