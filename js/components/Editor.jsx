var React = require('react');

class Editor extends React.Component {

	constructor(props) {
		super(props);
		this.displayName = 'Editor';
		this.state = {content: this.props.content, previewVisible: this.props.previewVisible}
	}

	handleTextChange(event) {
		this.setState({content: event.target.value});
		this.props.setContent(event.target.value);
	}

  componentWillReceiveProps(props){
  	this.setState({content: props.content, previewVisible: props.previewVisible});
  }

	render() {
		var width;
		if(this.state.previewVisible){
			width = '50%';
		}else{
			width = '100%';
		}
		return <section className="editor" style={{width: width}}>
							<textarea placeholder="It's quite in here..." className="input" value={this.state.content} onChange={this.handleTextChange.bind(this)}></textarea>
						</section>
	}

}

export default Editor;