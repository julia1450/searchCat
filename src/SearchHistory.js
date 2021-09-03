class SearchHistory {
    constructor({$target, initialData, onClick}){
        this.$target = $target;
        this.initialData = initialData;
        this.onClick = onClick;
        
        const $searchHistory = document.createElement('div');
        $searchHistory.className = "SearchHistory";
        this.$searchHistory = $searchHistory;

        this.$target.appendChild($searchHistory);

        this.$searchHistory.addEventListener("click", (e)=>{
            if(e.target.closest('button')) this.onClick(e.target.innerHTML);
        });
        this.render();
    }

    setState(state) {
        this.initialData = state;
        this.render();
    }

    render() {
        this.$searchHistory.innerHTML = this.initialData.map(data=>{
            return `<button>${data}</button>`
        }).join('');
    }
}