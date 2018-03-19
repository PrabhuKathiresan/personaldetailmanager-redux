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
      note: {},
      title: {
        delete: {
          header: 'Delete Record',
          body: 'Are you sure you want to delete the record',
          record: ''
        }
      }
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

  confirmNoteDeletion(event, note) {
    event.preventDefault();
    const { title } = this.state;
    title.delete.record = note.title;
    this.setState({
      title
    });
    const dialog = document.querySelector('dialog.delete');
    dialog.showModal();
    dialog.querySelector('dialog.delete .close').addEventListener('click', () => {
      dialog.close();
    });

    dialog.querySelector('dialog.delete .agree').addEventListener('click', () => {
      this.props.delete(note);
      dialog.close();
    });
  }

  render() {
    const notes = this.props.notes.data.map((note, index) => (
      <div className="mdl-card mdl-shadow--2dp" key={index} style={{ backgroundColor: note.theme ? note.theme.color : '#FFFFFF' }}>
        <div className="mdl-card__title extra-padding-right">
          <h2 className="mdl-card__title-text">{note.title}</h2>
        </div>
        <div className="mask" onClick={event => this.editNote(event, note)}></div>
        <div className="mdl-card__supporting-text" dangerouslySetInnerHTML={{ __html: note.content }}></div>
        <span className="mdl-card__custom-action displayNone" onClick={(event => this.confirmNoteDeletion(event, note))}><i className="material-icons">delete</i></span>
      </div>
    ));

    return (
      <div>
        <NewNote addNotes={this.props.add} type="add" />
        <div style={{ display: this.props.notes.data.length > 0 ? 'block' : 'none' }}>
          <MasonryInfiniteScroller onLoad={this.updateImage()} ref={this.setContainerRef} className="place-at-center" pack={this.state.pack} hasMore={this.state.hasMore} loadMore={() => console.log('load more')}>
            {notes}
          </MasonryInfiniteScroller>
        </div>
        <div style={{ display: this.props.notes.data.length === 0 ? 'block' : 'none' }}>
          <div>No data found</div>
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
          </svg>
        </div>
        <div className="loadMore" style={{ display: this.props.notes.isCompletelyLoaded ? 'none' : 'block' }}>
          <div className="mdl-spinner mdl-spinner--small mdl-spinner--single-color mdl-js-spinner is-active"></div>
        </div>
        <dialog className="mdl-dialog custom-dialog update">
          <NewNote addNotes={this.props.update} closeDialog={this.closeDialog} showCloseButton={true} type="update" note={this.state.note} />
        </dialog>
        <dialog className="mdl-dialog delete">
          <p className="title extra-margin-left">{this.state.title.delete.header}</p>
          <div className="mdl-dialog__content">
            <p>
              {this.state.title.delete.body}
            </p>
            <p className="title">{this.state.title.delete.record}</p>
          </div>
          <div className="mdl-dialog__actions mdl-dialog__actions--full-width">
            <button type="button" className="mdl-button agree">Yes</button>
            <button type="button" className="mdl-button close">No</button>
          </div>
        </dialog>
      </div>
    );
  }
}

export default Notes;