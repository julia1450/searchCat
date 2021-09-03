class Loading {
  $loading = null;
  data = null;

  constructor({ $target, data }) {
    const $loading = document.createElement("div");
    $loading.className = "Loading";
    this.$loading = $loading;
    $target.appendChild($loading);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      this.$loading.innerHTML = `
        <img src="src/img/loading.gif">
        `;
      this.$loading.style.display = "block";
    } else {
      this.$loading.style.display = "none";
    }
  }
}
