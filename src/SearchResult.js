class SearchResult {
  $target = null;
  $searchResult = null;
  searchKeyword = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onScroll }) {
    this.searchKeyword = "";
    this.$target = $target
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onScroll = onScroll;

    this.render();
    this.eventBinding();
  }

  setState(nextData, keyword) {
    this.searchKeyword = keyword;
    this.data = nextData;
    this.render();
  }

  render() {
    let innerTemplate = ''
    if(this.data.length > 0) {
      innerTemplate = this.data
        .map(
          (cat, index) => {
            if(index < 6) {
                return `
                <div class="item" data-index=${index}>
                  <img src="${cat.url}" alt="${cat.name}" title="${cat.name}" />
                </div>
              `
            } else {
              return `
                <div class="item lazy" data-index=${index}>
                  <img data-src="${cat.url}" alt="${cat.name}" title="${cat.name}" />
                </div>
              `
            }
          }
        ).join("");

    } else if (this.searchKeyword != "") {
      innerTemplate = `<div>검색 결과가 없습니다.</div>`;
    }
    this.$searchResult.innerHTML = innerTemplate;

    this.imageObserver();
  }

  eventBinding() {
    this.$searchResult.addEventListener("click", (e)=>{
      const $item = e.target.closest('.item');
      if($item) {
        console.log($item.dataset.index)
        this.onClick(this.data[$item.dataset.index]);
      }
    });
  }

  imageObserver() {
    const self = this;

    if ("IntersectionObserver" in window) {
      const lazyCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if(entry.intersectionRatio > 0) {
            const $img = entry.target.querySelector("img")
            $img.src = $img.dataset.src;
            entry.target.classList.remove('lazy')
            // unobserve는 엘리먼트 관찰 멈춤. 전체 관찰 멈추고 싶을 경우 disconnect()
            observer.unobserve(entry.target)
          }
        });
      }
      const lazyIo = new IntersectionObserver(lazyCallback);
      const lazyImgList = document.querySelectorAll('.lazy');
      lazyImgList.forEach(el => {
          // observe는 엘리먼트 관찰 시작
          lazyIo.observe(el);
      })

      const infiniteCallback  = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            self.onScroll();
          }
        });
      }
      const option = {
        threshold: 1.0
      }
      const infiniteIo = new IntersectionObserver(infiniteCallback, option);
      const lastImg = document.querySelectorAll('img')[this.data.length-1];
      if(lastImg) infiniteIo.observe(lastImg);
      
    }
  }

  

  
}
