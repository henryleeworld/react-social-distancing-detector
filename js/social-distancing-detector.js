function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var requestId = null;

class SocialDistancer extends React.Component {
    constructor(props) {
        super(props);
        _defineProperty(this, "whichEmoji",
            () => {
                const {
                    emoji
                } = this.state;
                if (emoji === 'fist') {
                    return React.createElement("img", {
                        className: "img",
                        src: "images/make-a-fist.png"
                    });
                } else if (emoji === "point") {
                    return React.createElement("img", {
                        className: "img",
                        src: "images/pointer.png"
                    });
                } else {
                    return "😷";
                }
            });
        _defineProperty(this, "calculateDistance",

            (elem, mouseX, mouseY) => {
                const {
                    emoji
                } = this.state;
                let distance = Math.floor(Math.sqrt(Math.pow(mouseX - (elem.left + elem.width / 2), 2) + Math.pow(mouseY - (elem.top + elem.height / 2), 2)));

                if (distance < 100) {
                    this.setState({
                        emoji: "mask",
                        tooClose: true
                    });
                } else if (distance < 300) {
                    this.setState({
                        emoji: 'point',
                        tooClose: false
                    });
                } else {
                    this.setState({
                        emoji: "fist",
                        tooClose: false
                    });
                }
            });
        _defineProperty(this, "mouseMoved",

            e => {
                if (this.emoji.current) {
                    var emojiRects = this.emoji.current.getBoundingClientRect();
                    var arrowX = emojiRects.left + emojiRects.width / 2;
                    var arrowY = emojiRects.top + emojiRects.height / 2;
                    this.calculateDistance(emojiRects, e.clientX, e.clientY);
                    let dy = e.clientY - arrowY;
                    let dx = e.clientX - arrowX;
                    let radians = Math.atan2(dy, dx);
                    var pi = Math.PI;
                    let degrees = radians * (180 / pi);
                    this.emoji.current.style.transform = "rotate(" + (degrees + 90) + "deg)";
                }
                window.requestAnimationFrame(mouseMoved);
            });
        this.emoji = React.createRef();
        this.state = {
            emoji: "fist",
            tooClose: false
        };
    }

    render() {
        // 
        const {
            tooClose
        } = this.state;
        return (
            React.createElement("div", {
                    onMouseMove: e => this.mouseMoved(e),
                    class: "container"
                },
                React.createElement("div", {
                    className: tooClose ? "circle-close" : "circle"
                }),
                React.createElement("div", {
                    className: "emoji",
                    ref: this.emoji
                }, this.whichEmoji())));
    }
}

ReactDOM.render(
    React.createElement(SocialDistancer, null),
    document.getElementById('root'));