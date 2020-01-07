chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    let url = tabs[0].url;
    let matches = url.match(/^https:\/\/www\.joox\.com\/(\w+)\/single\/(.*?==)$/);

    if (matches != null) {
        let id = matches[2]

        axios.get(`https://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${id}&lang=id&country=id&from_type=null&channel_id=null&_=${(+new Date)}`)
            .then(res => {
                let data = res.data.replace('MusicInfoCallback(', '').replace(/\)$/, '');
                data = JSON.parse(data);

                $('#loading').hide();
                $('#download').show();

                console.log(data);

                $('#m4a').attr('href', data.m4aUrl);
                $('#md').attr('href', data.r192Url);
                $('#hq').attr('href', data.r320Url);
                $('#lq').attr('href', data.mp3Url);
            })
            .catch(err => {
                console.log(err);
            })
    }

    $('.button').click(function (e) {
        e.preventDefault();

        chrome.tabs.create({ url: this.href }); 
    })
});