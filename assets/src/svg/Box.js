import React from 'react';

class Box extends React.Component {
  render() {
    console.log(this);
    return (
      <svg height="225" width="225">
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_1" y2="200" x2="50" y1="50" x1="50" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_2" y2="200" x2="200" y1="50" x1="200" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_3" y2="200" x2="200" y1="200" x1="50" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_4" y2="50" x2="200" y1="50" x1="50" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_5" y2="25" x2="175" y1="25" x1="25" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_6" y2="175.5" x2="25.5" y1="25.5" x1="25" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_7" y2="175" x2="175" y1="175" x1="25" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_8" y2="175" x2="173.5" y1="25" x1="173.5" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_9" y2="50" x2="50" y1="25" x1="25" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_10" y2="50" x2="200" y1="25" x1="175" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_11" y2="200" x2="200" y1="175" x1="175" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_12" y2="200" x2="50" y1="175" x1="25" strokeWidth="3" fill="none"/>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_13" y2="50" x2="50" y1="120" x1="0" strokeWidth="3" fill="none"></line>
        <line stroke="#444" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_14" y2="25" x2="25" y1="55" x1="0" strokeWidth="3" fill="none"></line>
      </svg>
    );
  }
}

export default Box;