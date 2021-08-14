import { getContentFile } from '../../lib/contentFile'
import Head from 'next/head'
import { useRef } from 'react'
import YoutubeEmbed from '../../components/watch/embed/YoutubeEmbed'
import Link from 'next/link'
import Layout from '../../components/structure/Layout'
import CloseButton from '../../components/watch/closeButton/CloseButton'

export default function VideoPage(props) {
    const date = new Date(props.video.date);
    const formattedDate = `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}${new Date().getFullYear() === date.getFullYear() ? '' : `, ${date.getFullYear()}`}`;

    var leftPrefix = ""
    if(props.video.type === "clip") leftPrefix = "Clip • "
    else if(props.video.type === "compilation") leftPrefix = "Compilation • "

    return (
        <Layout bodyClass="video">
            <Head>
                <title>{ props.video.title + ' - KNN'}</title>
            </Head>

            
            <Link href="/feed"><a><CloseButton/></a></Link>

            <YoutubeEmbed id={props.video.youtubeId}>
                <div style={{marginTop:20,marginBottom:75}}>
                    <p style={{fontSize:12,color:props.video.show.color,fontWeight:700}}>{ leftPrefix + props.video.show.name + " S" + props.video.season + " E" + props.video.episode }</p>
                    <p style={{fontSize:18,marginTop:5,marginBottom:25,fontWeight:700}}>{ props.video.title }</p>
                    <p style={{color:'#bbb',lineHeight:'1.5'}}>{ props.video.description }</p>
                    <p style={{color:'#bbb',borderTop:'2px solid #333',paddingTop:15,marginTop:15,fontSize:12}}>{ `Published ${formattedDate} • ` }<Link href={`https://www.youtube.com/watch?v=${props.video.youtubeId }`}><a style={{color:'#9ecad9'}}>Watch on YouTube</a></Link></p>
                </div>
            </YoutubeEmbed>
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: getContentFile().videos.map(vid => { return { params: { vanityId: vid.vanityId } } }),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const content = getContentFile();
    const props = {'content': content}
    
    props.video = content.videos.find(vid => {
        return vid.vanityId == params.vanityId
    })
    //props.content = content;
    return {props: props}
}