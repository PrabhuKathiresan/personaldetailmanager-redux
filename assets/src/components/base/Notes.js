import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';

import NewNote from '../sub/NewNote';


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      hasMore: false,
      masonryContainerInstance: null,
      pack: true,
      note: {}
    };
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  componentWillMount() {
    $('main.mdl-layout__content').scrollTop(0);
    if (!this.props.notes.initiallyLoaded) {
      this.props.onLoad(this.props.notes.limit, this.props.notes.skip);
    }
    setTimeout(() => {
      const dialog = document.querySelector('dialog');
      if (!dialog.showModal) {
        window.dialogPolyfill.registerDialog(dialog);
      }
    }, 10);
  }

  componentWillUnmount() {
    console.log(this);
    const mainContent = $('main.mdl-layout__content');
    mainContent.unbind('scroll');
  }

  componentDidMount() {
    window.componentHandler.upgradeAllRegistered();
    $.fn.isFullyInViewport = function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();

      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      return elementTop >= viewportTop && elementBottom <= viewportBottom;
    };

    $(() => {
      let processing = false;
      const mainContent = $('main.mdl-layout__content');
      mainContent.bind('scroll', (e) => {
        if ($('.loadMore').isFullyInViewport()) {
          if (!this.props.notes.isCompletelyLoaded && !processing) {
            processing = true;
            this.props.onLoad(this.props.notes.limit, this.props.notes.skip);
          }
        } else {
          processing = false;
        }
      });
    });
  }

  componentDidUpdate() {
    if (this.state.masonryContainerInstance) {
      setTimeout(() => {
        this.updateImage();
      }, 10);
    }
  }

  updateImage() {
    const imgs = $('img');
    if (imgs.length > 0) {
      _.forEach(imgs, (img) => {
        $(img).on('load', () => {
          if (this.state.masonryContainerInstance) {
            this.state.masonryContainerInstance.forceUpdate();
            this.state.masonryContainerInstance.forcePack();
          }
        });
      });
    }
  }

  addNotes(newNote) {
    const { postUrl, notes } = this.state;
    axios.post(postUrl, newNote)
      .then((res) => {
        const data = res.data;
        if (data.success) {
          notes.unshift(data.details);
          this.setState({
            notes
          });
        }
      })
      .catch(err => console.log(err));
  }

  setContainerRef(component) {
    this.setState({
      masonryContainerInstance: component
    });
  }

  editNote(event, note) {
    event.preventDefault();
    this.setState({
      note
    });
    const dialog = document.querySelector('dialog.update');
    const showModalButton = document.querySelector('.show-modal');
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', () => {
      dialog.close();
    });
  }

  closeDialog() {
    console.log(this.state);
    const dialog = document.querySelector('dialog.update');
    if (dialog) {
      dialog.close();
    }
  }

  render() {
    const notes = this.props.notes.data.map((note, index) => (
      <div className="mdl-card mdl-shadow--2dp" key={index} style={{ backgroundColor: note.theme ? note.theme.color : '#FFFFFF' }}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{note.title}</h2>
        </div>
        <div className="mask" onClick={event => this.editNote(event, note)}></div>
        <div className="mdl-card__supporting-text" dangerouslySetInnerHTML={{ __html: note.content }}></div>
      </div>
    ));

    return (
      <div>
        <NewNote addNotes={this.props.add} type="add" />
        <MasonryInfiniteScroller onLoad={this.updateImage()} ref={this.setContainerRef} className="place-at-center" pack={this.state.pack} hasMore={this.state.hasMore} loadMore={() => console.log('load more')}>
          {notes}
        </MasonryInfiniteScroller>
        <div className="loadMore" style={{ display: this.props.notes.isCompletelyLoaded ? 'none' : 'block' }}>
          <div className="mdl-spinner mdl-spinner--small mdl-spinner--single-color mdl-js-spinner is-active"></div>
        </div>
        <dialog className="mdl-dialog custom-dialog update">
          <NewNote addNotes={this.props.update} closeDialog={this.closeDialog} showCloseButton={true} type="update" note={this.state.note} />
        </dialog>
      </div>
    );
  }
}

export default Notes;