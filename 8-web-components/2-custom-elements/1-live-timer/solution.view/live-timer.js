class LiveTimer extends HTMLElement {

  render() {
    this.innerHTML = `
    <time-formatted hour="numeric" minute="numeric" second="numeric">
    </time-formatted>
    `;

    this.timerElem = this.firstElementChild;
  }

  connectedCallback() { // (2)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElem.setAttribute('datetime', this.date);
    this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
  }

  disconnectedCallback() {
<<<<<<< HEAD
    clearInterval(this.timer); // 让这个元素被垃圾回收是非常重要的
=======
    clearInterval(this.timer); // important to let the element be garbage-collected
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
  }

}

customElements.define("live-timer", LiveTimer);
