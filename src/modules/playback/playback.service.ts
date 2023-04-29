import { Injectable } from '@nestjs/common'
import ffmpeg from 'fluent-ffmpeg'

@Injectable()
export class PlaybackService {
  async getInitSegment(videoPath: string, codecs?: string) {
    return new Promise((resolve, reject) => {
      // Get video metadata
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err)
          return
        }

        // Get codec information from metadata
        const videoCodec = metadata.streams.find((s) => s.codec_type === 'video').codec_name
        const audioCodec = metadata.streams.find((s) => s.codec_type === 'audio').codec_name

        // Use specified codecs or default to those in the video file
        codecs = codecs || `${videoCodec},${audioCodec}`

        // Create ffmpeg command
        const command = ffmpeg(videoPath)
          .outputOptions([
            '-movflags frag_keyframe+empty_moov',
            `-c:v ${videoCodec}`,
            `-c:a ${audioCodec}`,
            '-f mp4'
          ])
          .outputFormat('mp4')
          .output('-', { end: true })
          .on('error', (err) => {
            reject(err)
          })

        // Set codecs if specified
        if (codecs) {
          command.outputOptions([`-codec:v ${codecs}`, `-codec:a ${codecs}`])
        }

        // Get initialization segment
        command.output('-', { end: true }).once('data', (chunk: Buffer) => {
          resolve(chunk)
        })
      })
    })
  }
}
