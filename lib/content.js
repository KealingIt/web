const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const request = require('request')
const MD5 = require("crypto-js/md5");

const CONTENT_SHEET_ID = '1-gIMyBIYwnoEqBp_HtYLu-jCipEcWO8Gq04OWZQ6EmA';
const PLAYLISTS_SHEET_ID = '1OdDGEBt0Y19MLzfM46a_AzpUtgNhAwa71421dLMT_Nk';

const main = async () => {
    const creds = {
        "type": "service_account",
        "project_id": "kealing-news-web",
        "private_key_id": "5ffa1df9d9a24de5a72d83e14bc3fd46bdf4e2f9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCP9vjeNtA4UsZx\nKTpAP4frBRMAgJQY+niRhGk7ucWquoE5WoXa/PPPHDFjMoCkBIjIqh7J6JdjciJ7\n8WlWhF5PAnMQtzwzLy0g51Ojh3bpClU2ypZktQ/5Y71Pk4lrxIOJ+KmgGXZ4xMMB\ngAJs+d+rJgIr0izcq7mR+gdghkUI6q91XdJuZySpWSj+f17X/qRlHhsiiHXKWb9l\npK/TJVZUyFdEKj/E5kmWkocxhUMxRC1f/XZFiqTirPTWcY6IkiI8ZAxFLJ0piPNL\nGppbOsCCIBszSSmx5KIl4gJFPD+Memwo5GQJmNxC/XPP0P0B0JPWHKN1d2911XL6\njCHvZfVtAgMBAAECggEAQ5BPydIFtHk8gn0rxl1Kh4TRHyo41uQt03VGAe60kuSG\nowkVyult7uQ3VWutLcym+S3F11JeQiCdiHeKzTzAGep3X//us8LPNiL6gMOhjcr4\npQc8v7St84fYn9EI7FfEt+rIiMeKbzFAp6KRAN3gF6111WUFAudg5t5lueop2f29\nvc/RXlzlmSzuqUerVAPx/vnfmO7PZi3mkUHJdJzzrzhYP1sJ8rls1mX03NZiQXtG\n5G4aTCP0qm6rIfOfBuiuQVVnh++rZhpJrmUoz75DP4t9x3/q8MhbA5eRd9KEWAgl\nVv/tKpOK0XVPC8B1H+XQ7OILS7FYMFysDi+9BH+p7QKBgQDKGpjusE7vozUcdtzW\nudvv1hUa+bYE7lVsW+arml17oJAJ5H50Ki34ODhRngFuiJjcXBfXwbEoL9M66C6N\nXodXt+10ObFqVqIdAJOTJuvq4uMotcnhQlDZpNykIF+dwkHgYplLQ6nRJEnI3fFy\nk9ETDQuZwlKmgXhUTtoFEGhUxwKBgQC2W0fOMSddO7jL0HgrWUdaTSpjkx2Y+lYR\n1xvOURTTZyu661V0guEBfcIINSSrZr6BxGxmmvg35zwPvSXfhnu2SInMA0O0SVYw\nJvaZsgOmbBGL+v2AlD0uTosn9t4LqonNqSJz4l5dSaHkrt/stVZu5I8GvSa7zmCY\ncR421nqIKwKBgFiWtgiSYddrC+HRPFYnHAASMCgl4yJgMjOQSRlZTbbeF6UucjuL\nLaFLS2yDPQ9tcsvM1mqtrXD3HbkJgzZWhC7wIXa7v0fkd6UM1qM/AVRxZa83mClU\nP0pXmJuc0Sy+tM+diKJUI4DYTjttBeP6ZT/bjQU2B7KSt+MEuU5U9daLAoGBAJZ/\n71s1Jg/EYleTzhm4rTLRzNIxcJP4x2Ah8EjukgmHdIfoAbcO7TSV3bV4ZrMvMLtY\nqT5lV8aLiP5UVRWNoDxo0ZEWgKIihIdpIMzoJisLtc+Zbe7YaUX2fNKW49ss/F5H\n4K9TfB3xzzM1QInTf2o2J/Sf13/Ya9BkS1Nm3+nRAoGAKfLi3xaSW5kP/+SX3sK6\nmEPLFOEtSB/Hj6K39LhUMmfqTONAssny0Cy5Pq1cpXKTDJj5GadcStd/bdzxtyMl\nyefOH05D6+2RViGwDRlZuNXhvITEd1YP57lpAFfisJpOA3hclA0kB9dZP2olQ1A7\ncqNSsdLWHdRr9ZFdlPuOGoI=\n-----END PRIVATE KEY-----\n",
        "client_email": "knn-sheets@kealing-news-web.iam.gserviceaccount.com",
        "client_id": "117848453943828912564",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/knn-sheets%40kealing-news-web.iam.gserviceaccount.com"
    }

    const content = new GoogleSpreadsheet(CONTENT_SHEET_ID)
    await content.useServiceAccountAuth(creds)
    await content.getInfo()

    const playlistsSheet = new GoogleSpreadsheet(PLAYLISTS_SHEET_ID)
    await playlistsSheet.useServiceAccountAuth(creds)
    await playlistsSheet.getInfo()

    const videos = await parseVideoMetadata(content)
    const shows = await parseShows(content)
    const noticeBoard = await parseNoticeBoard(content)
    const playlists =  await parsePlaylists(playlistsSheet)

    const processed = processContent(videos, playlists, shows, noticeBoard)
    fs.writeFileSync('content.json', JSON.stringify(processed))

    console.log("Done getting web content.");
}

const parseVideoMetadata = async (content) => {
    const alreadyDownloadedImages = []

    const videos = content.sheetsByIndex[0]
    const videosRows = await videos.getRows({ offset: 1 })
    const returnable = {}

    for (element of videosRows) {
        const data = element._rawData
        returnable[data[1]] = {
            'youtubeId': data[0],
            'vanityId': data[1],
            'title': data[2],
            'description': data[3],
            'date': new Date(data[4]),
            'type': data[5],
            'show': data[6],
            'season': parseInt(data[7]),
            'episode': parseInt(data[8]),
            'thumbnail':  'https://drive.google.com/uc?export=view&id=' + data[9].substring(data[9].lastIndexOf('/d/') + 3, data[9].lastIndexOf('/view')),
            'length': data[10].split(';')
        }

        const thumbnail = returnable[data[1]].thumbnail;
        const md5 = MD5(thumbnail).toString();

        if(!alreadyDownloadedImages.includes(thumbnail)) {
            alreadyDownloadedImages.push(thumbnail)
            await download(thumbnail, "public/thumbnails/" +  md5 + ".png")
        }

        returnable[data[1]].thumbnail = md5;
    };

    return returnable;
}

const parseShows = async (content) => {
    const shows = content.sheetsByIndex[1]
    const showsRows = await shows.getRows({ offset: 1 })
    const returnable = {}

    showsRows.forEach(element => {
        const data = element._rawData
        returnable[data[0]] = {
            'showId': data[0],
            'name': data[1],
            'color': data[2]
        }
    })

    return returnable;
}

const parseNoticeBoard = async (content) => {
    const noticeBoard = content.sheetsByIndex[2]
    const noticeBoardRows = await noticeBoard.getRows({ offset: 1 })
    const returnable = []

    noticeBoardRows.forEach(element => {
        const data = element._rawData
        returnable.push({
            'header': data[0],
            'description': data[1],
            'emoji': data[2],
            'link': data[3]
        })
    })

    return returnable;
}

const parsePlaylists = async (playlistsSheet) => {
    const playlists = []
    for(const sheet of playlistsSheet.sheetsByIndex) {
        const videos = []
        const rows = await sheet.getRows({ offset: -1 })
        rows.forEach(row => {
            videos.push(row._rawData[0])
        })
        playlists.push({
            name: sheet._rawProperties.title,
            videos: videos
        })
    }
    return playlists;
}

const processContent = (rawVideos, rawPlaylists, shows, noticeBoard) => {
    const returnable = { videos: Object.values(rawVideos).map(vid => {vid.show = shows[vid.show]; return vid }), noticeBoard }

    const playlists = [{
        title: 'Latest Content',
        videos: Object.values(rawVideos).sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1).slice(0, 12)
    },
    {
        title: 'Watch Full Episodes',
        videos: Object.values(rawVideos).filter((o) => {return o.type === 'full episode'}).slice(0, 12)
    }]

    rawPlaylists.forEach((playlist) => {
        playlists.push({
            title: playlist.name,
            videos: playlist.videos.map((vid) => {return rawVideos[vid]})
        })
    })
    
    returnable.playlists = playlists

    console.log(returnable);
    return returnable
}

const download = async (uri, filename) => {
    return new Promise((resolve, reject) => {
        request.head(uri, (err, res, body) => {
            request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
                resolve()
            });
        });
    })
    
};

main()