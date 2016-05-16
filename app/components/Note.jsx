import React from 'react';

// export default ({task, ...props}) => <div {...props}>{task}</div>;
export default class Note extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          editing: false  
        };
    }
    
    render() {
        if(this.state.editing) {
            return this.renderEdit();
        }
        
        return this.renderNote();
    }
    
    renderNote = () => {
     const onDelete = this.props.onDelete;
     
     return (
        <div onClick={this.edit}>
            <span>{this.props.task}</span>
            {onDelete ? this.renderDelete() : null}
        </div>
      );
    };
    
    renderDelete = () => {
      return <button onClick={this.props.onDelete}>x</button>;   
    };
    
    edit = () => {
      this.setState({
          editing: true
      });  
    };
    
    renderEdit = () => {
        return <input type="text" 
          ref={
              element => element ? 
              element.selectionStart = this.props.task.length : 
              null
          }
          autoFocus = {true}
          defaultValue = {this.props.task}
          onBlur = {this.finishEdit}
          onKeyPress = {this.checkEnter} />;                            
    };
    
    checkEnter = (e) => {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    };
    
    finishEdit = (e) => {
        const value  = e.target.value;
        
        if(this.props.onEdit) {
            this.props.onEdit(value);           
        }        
        this.setState({
            editing: false
        });
    };   
}