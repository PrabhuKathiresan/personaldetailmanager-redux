import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      hasMore: false
    };
  }

  componentWillMount() {
    console.log(this.props);
    // this.props.onLoad();
    // this.props.notes.then((res) => {
    //   this.setState({
    //     notes: res.notes
    //   });
    // }).catch(err => console.log(err));
  }

  render() {
    const notes = this.props.notes.map((note, index) => (
      <div className="mdl-card mdl-shadow--2dp" key={index} style={{ backgroundColor: note.theme ? note.theme.color : '#FFFFFF' }}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{note.title}</h2>
        </div>
        <div className="mdl-card__supporting-text" dangerouslySetInnerHTML={{ __html: note.content }}></div>
      </div>
    ));

    return (
      <MasonryInfiniteScroller className="place-at-center" hasMore={this.state.hasMore} loadMore={() => console.log('load more')}>
        {notes}
      </MasonryInfiniteScroller>
    );
  }
}

export default Notes;