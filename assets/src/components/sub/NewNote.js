import React from 'react';
import _ from 'lodash';
import store from '../../store';
import actionTypes from '../../constants/action-types';

class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodataFoundImgClass: 'img-responsive',
      uploadUrl: '/api/post/file/upload',
      bgTheme: [
        {
          color: '#ccff90',
          name: 'Green'
        },
        {
          color: '#a7ffeb',
          name: 'Teal'
        },
        {
          color: '#ff8a80',
          name: 'Red'
        },
        {
          color: '#ffd180',
          name: 'Orange'
        },
        {
          color: '#ffff8d',
          name: 'Yellow'
        },
        {
          color: '#80d8ff',
          name: 'Blue'
        },
        {
          color: '#82b1ff',
          name: 'Dark Blue'
        },
        {
          color: '#FFFFFF',
          name: 'White'
        }
      ],
      colorpaletteadd: 'mdl-menu mdl-js-menu mdl-js-ripple-effect',
      colorpaletteupdate: 'mdl-menu mdl-menu--top-left mdl-js-menu mdl-js-ripple-effect',
      newNote: {
        theme: {
          color: '#FFFFFF',
          name: 'White'
        }
      }
    };
    this.addNewNotes = this.addNewNotes.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
  }

  componentDidMount() {
    console.log(this);
    setTimeout(() => {
      window.componentHandler.upgradeAllRegistered();
    }, 100);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      const { note } = this.props;
      if (note) {
        if (note.title) {
          document.getElementById(`placeholder-title-${this.props.type}`).style.visibility = 'hidden';
        }
        if (note.content) {
          document.getElementById(`placeholder-content-${this.props.type}`).style.visibility = 'hidden';
          document.getElementById(`content-${this.props.type}`).classList.add('has-value');
        }
        if (note.theme) {
          document.getElementById(`bg-color-${this.props.type}`).style.backgroundColor = note.theme.color;
        }
      }
      if (this.props.type === 'update') {
        this.setState({
          newNote: this.props.note
        });
      }
    }, 5);
  }

  updateChange(e, key) {
    const id = e.target.id;
    const innerHTML = e.target.innerHTML;
    const elementId = `placeholder-${e.target.id}`;
    if (!innerHTML || innerHTML === '') {
      document.getElementById(elementId).style.visibility = 'visible';
      if (id === `content-${this.props.type}`) {
        e.target.classList.remove('has-value');
      }
    } else {
      const newNote = Object.assign({}, this.state.newNote);
      newNote[key] = innerHTML;
      this.setState({
        newNote
      });
      if (id === `content-${this.props.type}`) {
        e.target.classList.add('has-value');
      }
      document.getElementById(elementId).style.visibility = 'hidden';
    }
  }

  handleTheme(e, t) {
    document.getElementById(`bg-color-${this.props.type}`).style.backgroundColor = t.color;
    const newNote = Object.assign({}, this.state.newNote);
    newNote.theme = t;
    this.setState({
      newNote
    });
  }

  handleFileUpload(event) {
    const files = event.target.files;
    const contentid = `content-${this.props.type}`;
    const elementId = `placeholder-${contentid}`;
    const imageIDS = [];
    _.forEach(files, (file, i) => {
      let imageid = new Date().getTime();
      imageid = `${imageid}-${i}`;
      const contentElement = document.getElementById(contentid);
      let innerHTML = contentElement.innerHTML;
      const img = `<div class="img-container" id="${imageid}-parent"><div class="img-loader" id="${imageid}-div"></div><div class="img-boxshadow"><img id="${imageid}" class="responsive small" src="" /></div><br></br></div>`;
      innerHTML = `${innerHTML}${img}`;
      contentElement.innerHTML = innerHTML;
      document.getElementById(elementId).style.visibility = 'hidden';
      contentElement.scrollTop = contentElement.scrollHeight - contentElement.clientHeight;
      imageIDS.push(imageid);
    });
    this.initUpload(files, imageIDS, 'images');
  }

  handleVideoFileUpload(event) {
    const files = event.target.files;
    const contentid = `content-${this.props.type}`;
    const elementId = `placeholder-${contentid}`;
    const videoIDS = [];
    _.forEach(files, (file, i) => {
      let videoid = new Date().getTime();
      videoid = `${videoid}-${i}`;
      const contentElement = document.getElementById(contentid);
      let innerHTML = contentElement.innerHTML;
      const video = `<div class="img-container" id="${videoid}-parent"><div class="img-loader" id="${videoid}-div"></div><div class="img-boxshadow"><video controls id="${videoid}" class="preview"><source src=""></video></div></div>`;
      innerHTML = `${innerHTML}${video}`;
      contentElement.innerHTML = innerHTML;
      document.getElementById(elementId).style.visibility = 'hidden';
      contentElement.scrollTop = contentElement.scrollHeight - contentElement.clientHeight;
      videoIDS.push(videoid);
    });
    this.initUpload(files, videoIDS, 'videos');
  }

  initUpload(files, ids, filetype) {
    const contentid = `content-${this.props.type}`;
    const formData = new FormData();
    _.forEach(files, (file) => {
      formData.append(filetype, file);
    });
    const request = new XMLHttpRequest();
    // const progressElement = document.getElementById(`${fileid}-div`);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        try {
          const response = JSON.parse(request.responseText);
          if (response.success) {
            const fileDetails = response.details;
            _.forEach(fileDetails, (fileDetail, i) => {
              const fileid = ids[i];
              const elem = document.getElementById(`${fileid}-parent`);
              elem.parentNode.removeChild(elem);
              const url = `/file/${fileDetail._id}`;
              let innerHTML = document.getElementById(contentid).innerHTML;
              let dynamicElement = '';
              if (filetype && filetype === 'images') {
                dynamicElement = `<img class="responsive" src=${url} />`;
              } else if (filetype && filetype === 'videos') {
                dynamicElement = `<video class="responsive" src=${url}></video>`;
              }
              innerHTML = `${innerHTML}<div class="margin">${dynamicElement}</div>`;
              document.getElementById(contentid).innerHTML = innerHTML;
            });
            const innerHTML = document.getElementById(contentid).innerHTML;
            const newNote = Object.assign({}, this.state.newNote);
            newNote.content = innerHTML;
            this.setState({
              newNote
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    request.upload.addEventListener('progress', (e) => {
      const progress = `${Math.round((e.loaded * 100) / e.total)}%`;
    }, false);
    request.open('POST', this.state.uploadUrl, true);
    request.send(formData);
  }

  addNewNotes() {
    const { newNote } = this.state;
    if (!newNote.content) {
      return;
    }
    // this.props.addNotes(newNote);
    store.dispatch({
      type: actionTypes.API_POST_NOTE,
      note: newNote
    });
    this.clearNewNote();
  }

  clearNewNote() {
    this.setState({
      newNote: {}
    });
    document.getElementById(`title-${this.props.type}`).innerHTML = '';
    document.getElementById(`content-${this.props.type}`).innerHTML = '';
    document.getElementById(`content-${this.props.type}`).classList.remove('has-value');
    document.getElementById(`placeholder-title-${this.props.type}`).style.visibility = 'visible';
    document.getElementById(`placeholder-content-${this.props.type}`).style.visibility = 'visible';
    document.getElementById(`bg-color-${this.props.type}`).style.backgroundColor = '#ffffff';
  }

  render() {
    let note = {};
    let colorpalette = '';
    if (this.props.type === 'add') {
      note = {
        title: undefined,
        content: undefined
      };
      colorpalette = this.state.colorpaletteadd;
    } else {
      note = this.props.note;
      colorpalette = this.state.colorpaletteupdate;
    }
    const { bgTheme } = this.state;
    const themes = bgTheme.map((theme, index) => (
      <li key={index} className="mdl-menu__item" onClick={event => this.handleTheme(event, theme)}>
        <div className="color-palette-container">
          <div className="color-palette">
            <div style={{ backgroundColor: theme.color }}></div>
          </div>
          <div className="color-palette-text">{theme.name}</div>
        </div>
      </li>
    ));
    let closeButton = null;
    if (this.props.showCloseButton) {
      closeButton = <button className="mdl-button mdl-js-button mdl-js-ripple-effect close">
                      close
                    </button>;
    }
    return (
      <div className="align-center bg-default box-shadow" id={`bg-color-${this.props.type}`}>
        <div className="content-editable" id="main-content">
          <div className="content-editable-container">
            <div className="place-holder" id={`placeholder-title-${this.props.type}`}>Title</div>
            <div dangerouslySetInnerHTML={{ __html: note.title ? note.title : undefined }} className="content-editable-title content-editable-area" id={`title-${this.props.type}`} contentEditable="true" suppressContentEditableWarning={true} onInput={(event => this.updateChange(event, 'title'))}></div>
          </div>
          <hr className="no-margin"></hr>
          <div className="content-editable-container content-container">
            <div className="place-holder non-title" id={`placeholder-content-${this.props.type}`}>Add a new note...</div>
            <div dangerouslySetInnerHTML={{ __html: note.content ? note.content : undefined }} className="content content-editable-area" id={`content-${this.props.type}`} contentEditable="true" suppressContentEditableWarning={true} onInput={(event => this.updateChange(event, 'content'))}></div>
          </div>
        </div>
        <hr className="no-margin"></hr>
        <div className="content-editable-actions">
          <div className="left">
            <button id={`color-palette-${this.props.type}`} className="mdl-button mdl-js-button mdl-button--icon">
              <i className="material-icons">palette</i>
            </button>
            <div className="mdl-tooltip" data-mdl-for={`color-palette-${this.props.type}`}>
              Change theme
            </div>
            <ul className={colorpalette} htmlFor={`color-palette-${this.props.type}`}>
              <div className="flex-box dropdown-width">
                {themes}
              </div>
            </ul>
            <button id={`add-image-${this.props.type}`} className="mdl-button mdl-js-button mdl-button--icon" onClick={() => { document.getElementById(`image-${this.props.type}`).click(); }}>
              <i className="material-icons">insert_photo</i>
              <input type="file" name="images" accept="image/*" multiple id={`image-${this.props.type}`} request-type={`${this.props.type}`} style={{ display: 'none' }} onChange={(e => this.handleFileUpload(e))} />
            </button>
            <div className="mdl-tooltip" data-mdl-for={`add-image-${this.props.type}`}>
              Add image
            </div>
            <button id={`add-video-${this.props.type}`} className="mdl-button mdl-js-button mdl-button--icon" onClick={() => { document.getElementById(`video-${this.props.type}`).click(); }}>
              <i className="material-icons">theaters</i>
              <input type="file" name="videos" accept="video/*" multiple id={`video-${this.props.type}`} request-type={`${this.props.type}`} style={{ display: 'none' }} onChange={(e => this.handleVideoFileUpload(e))} />
            </button>
            <div className="mdl-tooltip" data-mdl-for={`add-video-${this.props.type}`}>
              Add video
            </div>
          </div>
          <div className="right">
            {closeButton}
            <button id="add-new-note" className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.addNewNotes}>
              {this.props.type}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNote;