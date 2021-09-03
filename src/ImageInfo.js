class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();

    this.eventBinding()
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.classList.add('in');
    } else {
      this.$imageInfo.classList.add('out');
      this.$imageInfo.classList.remove('in');
      setTimeout(()=>{
        this.$imageInfo.classList.remove('out');
      } ,500)
      
    }
  }

  eventBinding() {
    this.$imageInfo.addEventListener("click", (e) => {
      console.log(e.target)
      if(e.target.closest('.close') === e.target || e.target.closest(".ImageInfo") === e.target) {
        this.data.visible  = !this.data.visible
        this.setState(this.data)
      }
    });
    window.addEventListener('keyup', (e) => {
      if(e.code === 'Escape') {
        this.data.visible  = !this.data.visible
        this.setState(this.data)
      }
    })
  }
  

}
