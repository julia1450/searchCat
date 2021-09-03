console.log("app is running!");

class App {
  $target = null;
  data = [];
  bannerData = [];
  history = [];

  constructor($target) {
    this.$target = $target;
    this.history = sessionStorage.getItem('searchHistory') != null?  sessionStorage.getItem('searchHistory').split(',') : [];
    this.searchKeyword = "";
    
    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.setState({ visible: true });

        this.history.unshift(keyword);
        if(this.history.length > 5) this.history.pop();
        this.searchHistory.setState(this.history);
        sessionStorage.setItem('searchHistory', this.history);

        api.fetchCats(keyword).then(({ data }) => {
          this.searchKeyword = keyword;
          this.setState(data, keyword);
          this.loading.setState({ visible: false });
        }).catch(e => {
          this.setState([], keyword);
          this.loading.setState({ visible: false });
        });
      }
    });

    this.searchButton = new SearchButton({
      $target,
      onSearch: () => {
        this.loading.setState({ visible: true });
        api.fetchRandomCat().then(({ data }) => {
          this.setState(data, "");
          this.loading.setState({ visible: false });
        }).catch(e => {
          this.setState([], "");
          this.loading.setState({ visible: false });
        });
      }
    })

    this.searchHistory = new SearchHistory({
      $target,
      initialData: this.history,
      onClick: keyword => {
        this.loading.setState({ visible: true });
        api.fetchCats(keyword).then(({ data }) => {
          this.searchKeyword = keyword;
          this.setState(data, keyword);
          this.loading.setState({ visible: false });
        }).catch(e => {
          this.setState([], keyword);
          this.loading.setState({ visible: false });
        });
      }
    })

    this.banner = new Banner({
      $target,
      initialData: this.bannerData,
      clickPrev: (bannerIndex) => {
        const $slideArea = document.querySelector('.slide-area');
        let offsetWidth = document.querySelector('.item-area').offsetWidth;
        $slideArea.style.left = `-${bannerIndex * offsetWidth}px`;
        //console.log('prev');
      },
      clickNext: (bannerIndex) => {
        const $slideArea = document.querySelector('.slide-area');
        let offsetWidth = document.querySelector('.item-area').offsetWidth;
        $slideArea.style.left = `-${bannerIndex * offsetWidth}px`;
        //console.log('next');
      }
    })

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        this.loading.setState({ visible: true });

        api.fetchCat(image.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            image: data || {}
          });
          this.loading.setState({ visible: false });
        }).catch((e) => {
          this.loading.setState({ visible: false });
        });

      },
      onScroll: () => {
        this.loading.setState({ visible: true });
        this.setState([...this.data, ...this.data], this.searchKeyword);
        this.loading.setState({ visible: false });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.loading = new Loading({
      $target,
      data: {
        visible: false,
      }
    });

    this.init();
  }

  init() {
    if(this.history.length > 0) {
      this.searchHistory.onClick(this.history[0])
    }
    api.fetchRandomCat().then(({ data }) => {
      this.banner.setState(data);
    }).catch(e => {
      this.banner.setState([]);
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData, this.searchKeyword);
  }
}

