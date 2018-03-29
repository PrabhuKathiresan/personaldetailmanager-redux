import React from 'react';
// import MasonryInfiniteScroller from 'react-masonry-infinite';
import StackGrid from 'react-stack-grid';
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';

import NewNote from '../sub/NewNote';
import NodatafoundSVG from '../../svg/Nodatafound';
import Loader from '../helper/Loader';


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      hasMore: false,
      masonryContainerInstance: null,
      loaderClass: 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active',
      pack: true,
      note: {},
      title: {
        delete: {
          header: 'Delete Record',
          body: 'Are you sure you want to delete the record',
          record: ''
        }
      },
      showModal: false,
      toastElement: 'toast-control'
    };
    this.setContainerRef = this.setContainerRef.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  componentWillMount() {
    $('main.mdl-layout__content').scrollTop(0);
    if (!this.props.notes.initiallyLoaded) {
      this.props.onLoad(this.props.notes.limit, this.props.notes.skip);
    }
    setTimeout(() => {
      const dialog = document.querySelector('dialog');
      if (dialog && !dialog.showModal) {
        window.dialogPolyfill.registerDialog(dialog);
      }
    }, 1000);
  }

  componentWillUnmount() {
    console.log(this);
    const mainContent = $('main.mdl-layout__content');
    mainContent.unbind('scroll');
    window.componentHandler.upgradeAllRegistered();
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
      const mainContent = $('main.mdl-layout__content');
      mainContent.scrollTop(0);
      mainContent.bind('scroll', () => {
        const divHeight = mainContent.outerHeight();
        const scrollHeight = mainContent.prop('scrollHeight');
        const windowScrTp = mainContent.scrollTop();
        const bottom = windowScrTp > (scrollHeight - divHeight - 50);
        if (bottom && !this.props.notes.isFetching && !this.props.notes.isCompletelyLoaded) {
          this.props.processing(true);
          this.props.onLoad(this.props.notes.limit, this.props.notes.skip);
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
      note,
      showModal: true
    });
    setTimeout(() => {
      const dialog = document.querySelector('dialog.update');
      window.dialogPolyfill.registerDialog(dialog);
      dialog.showModal();
      dialog.querySelector('.close').addEventListener('click', () => {
        this.setState({
          showModal: false
        });
        dialog.close();
      });
    }, 100);
  }

  updateNotes(newnote) {
    this.props.update(newnote);
    this.showToastMessage({
      message: 'Note updated successfully !!!'
    });
  }

  closeDialog() {
    this.setState({
      showModal: false
    });
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
    window.dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
    dialog.querySelector('dialog.delete .close').addEventListener('click', () => {
      dialog.close();
    });

    dialog.querySelector('dialog.delete .agree').addEventListener('click', () => {
      this.props.delete(note);
      this.showToastMessage({
        message: 'Note deleted successfully !!!'
      });
      dialog.close();
      setTimeout(() => {
        this.grid.updateLayout();
      }, 100);
    });
  }

  selectNote(event, note) {
    event.preventDefault();
    this.props.selectNote(note, !note.selected);
  }

  deselectNotes() {
    this.props.deselectNotes();
  }

  showToastMessage(data) {
    const ele = document.getElementById(this.state.toastElement);
    ele.MaterialSnackbar.showSnackbar(data);
  }

  render() {
    const { showModal } = this.state;
    const notes = this.props.notes.data.map((note, index) => (
      <div className={`mdl-card mdl-shadow--4dp note-card ${note.selected ? 'inset-box-shadow' : ''}`} key={index} style={{ backgroundColor: note.theme ? note.theme.color : '#FFFFFF' }}>
        <div className="mdl-card__title block__title">
          <h2 className="mdl-card__title-text">{note.title}</h2>
        </div>
        <div className="mask" onClick={event => this.editNote(event, note)}></div>
        <div className="mdl-card__supporting-text" dangerouslySetInnerHTML={{ __html: note.content }}></div>
        <div className="mdl-card____action">
          {/* <div id="select_tooltip" className="mdl-card____action__item" onClick={(event => this.selectNote(event, note))}><i className="material-icons">done</i></div>
          <div className="mdl-tooltip is-active" data-mdl-for="select_tooltip">
            Select note
          </div>
          <div className="mdl-card____action__item" onClick={(event => this.confirmNoteDeletion(event, note))}><i className="material-icons">delete</i></div> */}
          <div className="mdl-card__action__icon__button">
            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={(event => this.selectNote(event, note))}>
              <i className="material-icons">done</i>
            </button>
          </div>
          <div className="mdl-card__action__icon__button">
            <button className="mdl-button mdl-js-button mdl-button--icon" onClick={(event => this.confirmNoteDeletion(event, note))}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    ));

    const nodatafound = <div className="text-center">
      <NodatafoundSVG />
      <div className="title">No data found</div>
    </div>;

    /* const displayNotes = <MasonryInfiniteScroller onLoad={this.updateImage()} ref={this.setContainerRef} className="place-at-center" pack={this.state.pack} hasMore={this.state.hasMore} loadMore={() => console.log('No use')}>
        {notes}
      </MasonryInfiniteScroller>; */
    const displayNotes = <StackGrid gridRef={(grid) => { this.grid = grid; }} columnWidth={260} gutterWidth={10} gutterHeight={10}>{notes}</StackGrid>;

    const selectedDocument = <div className={`selected-notes ${this.props.notes.selectedDocumentCount > 0 ? 'show' : ''}`}>
      <div className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.deselectNotes()}>
        <i className="material-icons">arrow_back</i>
      </div>
      <span className="informations">{this.props.notes.selectedDocumentCount} selected</span>

      <div className="selected-notes__actions">
        <div className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.deleteSelectNotes()}>
          <i className="material-icons">delete</i>
        </div>
        <div className="mdl-button mdl-js-button mdl-button--icon" onClick={() => this.deleteSelectNotes()}>
          <i className="material-icons">archive</i>
        </div>
      </div>
    </div>;

    const Dialog = <dialog className="mdl-dialog custom-dialog update">
                    <NewNote addNotes={this.updateNotes} closeDialog={this.closeDialog} showCloseButton={true} type="update" note={this.state.note} />
                  </dialog>;

    return (
      <div>
        <NewNote addNotes={this.props.add} type="add" />
        { this.props.notes.data.length > 0 ? displayNotes : nodatafound }
        <div className="text-center" style={{ display: this.props.notes.isFetching ? 'block' : 'none', margin: '20px auto' }}><div className={this.state.loaderClass}></div></div>
        {selectedDocument}
        { showModal ? Dialog : '' }
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
        <div id={this.state.toastElement} className="mdl-js-snackbar mdl-snackbar">
          <div className="mdl-snackbar__text"></div>
          <button className="mdl-snackbar__action" type="button"></button>
        </div>
      </div>
    );
  }
}

export default Notes;