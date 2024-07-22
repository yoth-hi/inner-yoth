import {
  Register,
  html
}

from "../components/DOM.js"


const _template = html`
<style scoped>
app-spanner {
  display: block;
  width: 24px;
  margin: 0 auto;
  --size: 24px;
  position: relative
}
app-spanner .overlay {
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

app-spanner .spinner {
  font-size: calc(var(--size)*1.6);
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
}
app-spanner .spinner.center {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

app-spanner .spinner-blade {
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.5em;
  background-color: transparent;
  transform-origin: center -0.2222em;
  -webkit-animation: spinner-fade 1s infinite linear;
          animation: spinner-fade 1s infinite linear;
}
app-spanner .spinner-blade:nth-child(1) {
  -webkit-animation-delay: 0s;
          animation-delay: 0s;
  transform: rotate(0deg);
}
app-spanner .spinner-blade:nth-child(2) {
  -webkit-animation-delay: 0.083s;
          animation-delay: 0.083s;
  transform: rotate(30deg);
}
app-spanner .spinner-blade:nth-child(3) {
  -webkit-animation-delay: 0.166s;
          animation-delay: 0.166s;
  transform: rotate(60deg);
}
app-spanner .spinner-blade:nth-child(4) {
  -webkit-animation-delay: 0.249s;
          animation-delay: 0.249s;
  transform: rotate(90deg);
}
app-spanner .spinner-blade:nth-child(5) {
  -webkit-animation-delay: 0.332s;
          animation-delay: 0.332s;
  transform: rotate(120deg);
}
app-spanner .spinner-blade:nth-child(6) {
  -webkit-animation-delay: 0.415s;
          animation-delay: 0.415s;
  transform: rotate(150deg);
}
app-spanner .spinner-blade:nth-child(7) {
  -webkit-animation-delay: 0.498s;
          animation-delay: 0.498s;
  transform: rotate(180deg);
}
app-spanner .spinner-blade:nth-child(8) {
  -webkit-animation-delay: 0.581s;
          animation-delay: 0.581s;
  transform: rotate(210deg);
}
app-spanner .spinner-blade:nth-child(9) {
  -webkit-animation-delay: 0.664s;
          animation-delay: 0.664s;
  transform: rotate(240deg);
}
app-spanner .spinner-blade:nth-child(10) {
  -webkit-animation-delay: 0.747s;
          animation-delay: 0.747s;
  transform: rotate(270deg);
}
app-spanner .spinner-blade:nth-child(11) {
  -webkit-animation-delay: 0.83s;
          animation-delay: 0.83s;
  transform: rotate(300deg);
}
app-spanner .spinner-blade:nth-child(12) {
  -webkit-animation-delay: 0.913s;
          animation-delay: 0.913s;
  transform: rotate(330deg);
}

@-webkit-keyframes spinner-fade {
  0% {
    background-color: #69717d;
  }
  100% {
    background-color: transparent;
  }
}

@keyframes spinner-fade {
  0% {
    background-color: #69717d;
  }
  100% {
    background-color: transparent;
  }
}
</style>

<div class="overlay">
  <div class="spinner center">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
  </div>
</div>
`

class App {
  constructor() {}
  ready() {}
  attached() {
    this.hostElement.hasAttribute("role") || this.hostElement.setAttribute("role", "search");
  }
  static get properties() {
    return {
      isActive: {
        type: Boolean,
        value: false
      }

      ,
    }
  }
}

Register(App, "app-spanner", _template)