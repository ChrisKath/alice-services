export interface SkipTrack {
  intro?: SkipValues
  recap?: SkipValues
  ended?: SkipValues
}

export interface SkipValues {
  from: number
  to: number
}
