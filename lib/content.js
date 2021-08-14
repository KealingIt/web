const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const request = require('request')
const MD5 = require("crypto-js/md5");

const CONTENT_SHEET_ID = process.env.CONTENT_SHEET_ID;
const PLAYLISTS_SHEET_ID = process.env.PLAYLISTS_SHEET_ID;

const main = async () => {
    const creds = JSON.parse(process.env.GOOGLE_SPREADSHEET_CREDENTIALS)

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