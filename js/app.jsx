var React = require('react');
var ReactDOM = require('react-dom');

var Editor = require('./components/Editor');
var Preview = require('./components/Preview');
var StatusBar = require('./components/StatusBar');
var ipc = electronRequire('ipc');

var story = '#Alice In Wonderland\n###CHAPTER I. Down the Rabbit-Hole';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'App';
		this.state = {
			content: story,
			originalContent: "",
			previewOpen: true
		}

		// Setup Get/Set Methods
		window.setContent = (content) => this.setState({content: content})
		window.getContent = () => this.state.content

		console.log(ipc);

		//console.log(ipc.sendSync('synchronous-message', 'ping'));

		// In renderer process (web page).
	   /* console.log(ipc.sendSync('synchronous-message', 'ping')); // prints "pong"*/

		ipc.on('open-file', (contents) => this.setState({content: contents, originalContent: contents}));
		ipc.on('save-file', (path) => ipc.send('save-file', {path: path, contents: this.state.content}));

		ipc.on('load-theme', function(path){
			console.log('loading theme:'+path);
			if(!document.getElementById('theme')){
			var style = document.createElement('link');
					style.type 	= 'text/css';
					style.rel 	= 'stylesheet'
					style.setAttribute('id', 'theme');
					style.setAttribute('href', path);
					document.head.appendChild(style);
			}
			document.getElementById('theme').setAttribute('href', path);
		});

		//ipc.send('asynchronous-message', 'ping');

	}

	setContent(content){

		if(content != this.state.originalContent){
			ipc.send('document-change', true);
		}else{
			ipc.send('document-change', false);
		}

		this.setState({content: content});
	}

	togglePreview(){
		this.setState({previewOpen: !this.state.previewOpen});
	}

	render() {
		return 	<div className="app">
							<Editor previewVisible={this.state.previewOpen} content={this.state.content} setContent={this.setContent.bind(this)} />
							<Preview visible={this.state.previewOpen} content={this.state.content} />
							<StatusBar content={this.state.content} previewVisible={this.state.previewOpen} togglePreview={this.togglePreview.bind(this)} />
						</div>
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);