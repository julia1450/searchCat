class Banner {
    constructor({$target, initialData, clickPrev, clickNext}){
        this.$target = $target;
        this.state = initialData;
        this.clickPrev = clickPrev;
        this.clickNext = clickNext;
        this.bannerIndex = 0;

        const $banner = document.createElement('div');
        $banner.className = 'Banner';
        this.$banner = $banner;

        $target.appendChild($banner);

        this.render();
        this.eventBinding();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const catTemplate = this.state.map((cat, index) => {
            if(index < 5) {
                return `
                <div class="banner-item">
                    <img src="${cat.url}" alt="${cat.name}" title="${cat.name}" />
                </div>
                `
            } else {
                return `
                <div class="banner-item lazy">
                    <img data-src="${cat.url}" alt="${cat.name}" title="${cat.name}" />
                </div>
                `
            }
            
        }).join('');
        
        this.$banner.innerHTML = `
            <button class="prev-btn"}>이전</button>
            <div class="item-area"><div class="slide-area">${catTemplate}</div></div>
            <button class="next-btn">다음</button>
        `

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
        }
    }

    eventBinding() {
        this.$banner.addEventListener("click", (e) => {
            if(e.target.className === 'prev-btn') {
                if(this.bannerIndex > 0) {
                    this.bannerIndex--;
                    this.clickPrev(this.bannerIndex);
                }
                    
            } else if(e.target.className === 'next-btn') {
                let maxPage = this.state.length / 5
                if(this.bannerIndex < maxPage) {
                    this.bannerIndex++;
                    this.clickNext(this.bannerIndex);
                }
            }
        });
    }
}