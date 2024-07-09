import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

import {
  EVENT_NAME_ON_NAVEGATE_START,
  EVENT_NAME_ON_NAVEGATE_FINISH
} from "../components/vars.js"
const _template = html`
`

class App {
  constructor() {
    this.af = 0
  }

  ready() {}

  static get properties() {
    return {
      show: {
        type: Boolean,
        reflectToAttribute: true
      },
      progress: {
        type: String,
        observer: "onChengeProgress"
      },
    }
  }

  onChengeProgress(a) {
    const y = this.hostElement.animate(
      [{
        transform: "scaleX("+(this.af/100)+")"
      },
        {
          transform: "scaleX("+(a/100)+")"
        },
      ],
      300+(500*Math.random()),
    );
    this.hostElement.style.transform = "scaleX("+(a/100)+")"
    this.listen(y,"finish",()=>{
      if(a === 100){
        this.show = false;
        this.af = 0
        this.progress = 0
      } else {
        this.show = true;
        
      }
    })
    this.af = a
    // this.hostElement.style.transform="scaleX("+(a/100)+")"
  }
  attached() {
    this.listen(document, EVENT_NAME_ON_NAVEGATE_START, "startLoad")
    this.listen(document, EVENT_NAME_ON_NAVEGATE_FINISH, "endLoad")
  }
  startLoad() {
    this.show = true
    this.progress = 20+parseInt(20*Math.random());
  }
  endLoad() {
    this.progress = 100;
    // setTimeout(()=>{
    //   this.show = false
    //   this.progress = 0;
    // },300)
  }
}
Register(App, "app-progress", _template);