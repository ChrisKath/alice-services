import { Injectable } from '@nestjs/common'
import { ffprobe } from 'fluent-ffmpeg'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

@Injectable()
export class SpaceService {
  getName = (str: string) => str.replace(/.*\\/g, '')

  async getAlbum(dirPath: string) {
    const dirent = readdirSync(dirPath, { withFileTypes: true }).map((record) => ({
      pathName: join(dirPath, record.name),
      isDirectory: record.isDirectory(),
      isFile: record.isFile(),
      isPoster: record.isFile() && record.name.match(/^poster(.*).(webp|png|jpg|jpeg)$/g)?.length > -1
    }))

    let name = this.getName(dirPath)
    let { pathName: poster } = dirent.filter((r) => r.isPoster)[0]

    let seasons = dirent.filter((r) => r.isDirectory)
    let result = []
    for await (const season of seasons) {
      result.push({
        name,
        poster,
        seasonNo: +this.getName(season.pathName),
        episodes: await this.getSeasonTracks(season.pathName)
      })
    }

    return result
  }

  async getSeasonTracks(dirPath: string) {
    const tracks = readdirSync(dirPath, { withFileTypes: true }).filter((track) => track.isFile())
    let result = []

    for await (const track of tracks) {
      const filePath = join(dirPath, track.name)
      const trackMetadata = await this.getTrackMetadata(filePath)
      result.push(trackMetadata)
    }

    return result.map((record, index) => ({ ...record, episodeNo: index + 1 }))
  }

  async getTrackMetadata(filePath: string) {
    return new Promise((resolve, reject) => {
      ffprobe(filePath, (error, metadata) => {
        if (error) return reject(error)

        const LANG = {
          th: 'Thai',
          tha: 'Thai',
          thai: 'Thai',
          jp: 'Japanese',
          jpn: 'Japanese',
          japan: 'Japanese',
          japanese: 'Japanese'
        }

        const videoStream = metadata.streams.find((stream) => stream.codec_type === 'video')
        const audioStream = metadata.streams
          .filter((stream) => stream.codec_type === 'audio')
          .map((stream) => {
            let language = LANG[stream?.tags?.lang || stream?.tags?.language || stream?.tags?.LANGUAGE]
            let title = stream?.tags?.title

            if (title) {
              language += ` (${title})`
            }

            if (language) {
              return {
                index: stream.index,
                language,
                channels: stream.channels,
                channelLayout: stream.channel_layout
              }
            }

            return null
          })
          .filter((r) => r && r !== null)

        const subtitleStream = metadata.streams
          .filter((stream) => stream.codec_type === 'subtitle')
          .map((stream) => {
            let language = LANG[stream?.tags?.lang || stream?.tags?.language || stream?.tags?.LANGUAGE]

            if (language) {
              return {
                index: stream.index,
                language
              }
            }

            return null
          })
          .filter((r) => r && r !== null)[0]

        resolve({
          title: this.getName(metadata.format.filename || filePath).replace(/\.(.*)$/g, ''),
          filePath: metadata.format.filename || filePath,
          fileSize: statSync(filePath).size || metadata.format.size || 0,
          duration: parseFloat(videoStream?.duration) || metadata.format.duration || 0,
          audio: audioStream.length > 1 ? audioStream : void 0,
          subtitle: subtitleStream || void 0
        })
      })
    })
  }
}
