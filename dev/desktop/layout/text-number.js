import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

const _template = html`
<div id="items"></div>
`

class App {
  constructor() {
    this._items = []
  }

  ready() {}

  static get properties() {
    return {
      number: {
        type: Number,
        observer: "onChengeData"
      }
    }
  }

  attached() {
    this.hostElement.setAttribute("role", "text")
  }

  onChengeData(number) {
    const str = String(number)
    this.hostElement.setAttribute("aria-label", str)
    const w = str.length;
    for (let i = 0; i < w; i++) {
      this.createText(i, +str[i]);
    }
    setTimeout(() => {
      this.onChengeData(number += parseInt(727*Math.random()))
    }, 2000)
  }

  createText(i, index) {
    const k = this._items[i];
    if (!k) {
      const items = [];
      const parent = document.createElement("span")
      for (let i = 0; i < 10; i++) {
        const f = document.createElement("span")
        f.innerHTML = String(i)
        parent.appendChild(f)
        items.push(f)
      }
      this._items.push({
        parent,
        items,
        index
      })
      this.hostElement.appendChild(parent)
    } else {
      k.parent.style.display = ""
    }
    const duration = 500 + index * 100; // Aumenta a duração da animação com base no valor do índice
    animateToIndex(this._items[i].index, index, (index) => {
      this._items[i].parent.style.transform = "translateY(" + -(index * 100) + "%)"
      this._items[i].index = index;
    }, duration)
  }
}

function animateToIndex(start, end, on, duration) {
  let currentIndex = start;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const progressPercentage = Math.min(progress / duration, 1);
    const nextIndex = Math.floor(start + (end - start) * progressPercentage);

    if (nextIndex !== currentIndex) {
      on(nextIndex);
      currentIndex = nextIndex;
    }

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      on(end);
    }
  }

  requestAnimationFrame(animate);
}

Register(App, "app-text-number", _template);

