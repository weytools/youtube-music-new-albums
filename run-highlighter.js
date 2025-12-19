(function () {
    let artistList = []
    document.querySelectorAll('ytmusic-two-row-item-renderer').forEach(node => {
        let isAlbum = node.querySelector('span.yt-formatted-string').textContent == 'Album'
        if (isAlbum) {
            // node.style.background = 'green'
            node.classList.add('new-release-album')
            // get artist
            let artistName = ''
            node.querySelectorAll('.subtitle .yt-formatted-string.style-scope').forEach((s, i) => {
                if (i != 0) {
                    if (i != 1) {
                        artistName += s.textContent
                    }
                }
            })
            artistList.push(artistName)
        }
    })
    // let headerTag = document.querySelector("h1")
    // let listParagraph = document.createElement("p")
    // listParagraph.textContent = artistList.join('\n')
    // listParagraph.style.whiteSpace = 'pre-wrap';
    // listParagraph.style.columnCount = 3;
    // headerTag.after(listParagraph);
})();