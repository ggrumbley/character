'use strict';

import React from 'react';

import Icon from '../../../components/Icon';

export default React.createClass({
  displayName: 'LanguagesDialog',


  getInitialState() {
    return ({
      editMode: false,
      dirty: false
    })
  },


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    onLanguageChange: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  editSave() {
    if (this.state.editMode) {
      let name = this.refs.newName.value.trim();
      let desc = this.refs.newDesc.value.trim();

      let shouldUpdate = name !== this.props.name || desc !== this.props.desc;

      if (shouldUpdate) {
        let data = {
          id: this.props.id,
          name,
          desc,
        };

        this.props.onLanguageChange({ type: 'LANGUAGE_EDIT', data });
      }
    }

    this.setState({ editMode: !this.state.editMode, dirty: false })
  },


  handleRemove() {
    if (this.state.editMode) {
      this.setState({ editMode: false, dirty: false });
      return;
    }

    let result = window.confirm(`Delete Language: ${this.props.name}?`);
    if (result) {
      this.props.onLanguageChange({ type: 'LANGUAGE_DELETE', data: { id: this.props.id }});
    }
  },


  render() {

    return (
      <section>
        <div className='modal-header'>
          <h3>
          {
            this.state.editMode ? 
            <input type='text' defaultValue={this.props.name} placeholder={this.props.name} ref='newName' onChange={this.makeDirty}/> :
            this.props.name
          }
          </h3>
        </div>
        <div className='modal-content'>
          {
            this.state.editMode ?
            <textarea defaultValue={this.props.desc} ref='newDesc' placeholder={this.props.desc} onChange={this.makeDirty}/> :
            <p>{this.props.desc}</p>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={this.state.editMode ? 'bg-green text-green' : ''}>
            <p><Icon icon='fa fa-pencil' /> {this.state.editMode ? 'Save' : 'Edit'}</p>
          </button>
          <button onClick={this.handleRemove} className={this.state.editMode ? 'bg-red text-red' : ''}>
            <p><Icon icon='fa fa-remove' /> {this.state.editMode ? 'Cancel' : 'Remove'}</p>
          </button>
        </div>
      </section>
    )
  }
})