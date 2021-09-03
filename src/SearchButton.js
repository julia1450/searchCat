class SearchButton {
    constructor ({ $target, onSearch }) {
        const $searchButton = document.createElement('button');
        $searchButton.className = 'SearchButton';
        $searchButton.innerHTML = "random";

        $target.appendChild($searchButton);

        $searchButton.addEventListener("click", () => { onSearch() });
    }

}