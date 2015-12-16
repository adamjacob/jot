var React = require('react');
var Markdown = require('markdown').markdown;
var dynamics = require('dynamics.js');
var ReactDOM = require('react-dom');

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Preview';
    }
    componentDidMount(){
        this.springIn(this.props.visible)
    }
    componentWillReceiveProps(props){
        this.springIn(props.visible)
    }
    springIn(state){
        console.log(state);
        if(state){
            dynamics.animate(ReactDOM.findDOMNode(this.refs.preview), {
              translateX: 0
            }, {
              type: dynamics.spring,
              frequency: 200,
              friction: 200,
              duration: 500
            })
        }else{
            dynamics.animate(ReactDOM.findDOMNode(this.refs.preview), {
              translateX: window.innerWidth/2
            }, {
              type: dynamics.spring,
              frequency: 200,
              friction: 200,
              duration: 500
            })
        }
    }
    render() {
      return <section ref="preview" className="preview" dangerouslySetInnerHTML={{__html: Markdown.toHTML(this.props.content)}}></section>
    }
}

export default Preview;
