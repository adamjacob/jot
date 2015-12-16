var React = require('react');

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'StatusBar';
        this.state = {content: this.props.content, previewVisible: props.previewVisible};
    }
    readFile(file) {
        var fileDataString = MacGap.File.read(file, 'string');
        window.setContent(fileDataString);
    }

    componentWillReceiveProps(props){
        this.setState({content: props.content, previewVisible: props.previewVisible});
    }

    render() {
        var wordCount = 0;

        if(this.state.content.length > 0){
            wordCount = this.state.content.split(/\s+\b/).length
        }

        var previewClass = 'preview-button';
        if(this.state.previewVisible){
            previewClass = 'preview-button preview-open';
        }
        return 	<footer className="status-bar">
        					{wordCount} Words
        					<div className={previewClass} onClick={this.props.togglePreview}>Preview</div>
        				</footer>;
    }
}

export default StatusBar;
