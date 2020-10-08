export interface payload {
  event:
    | "library.on.deck"
    | "library.new"
    | "media.pause"
    | "media.play"
    | "media.rate"
    | "media.resume"
    | "media.scrobble"
    | "media.stop"
    | "admin.database.backup"
    | "admin.database.corrupted"
    | "device.new"
    | "playback.started"
  user: boolean
  owner: boolean
  Account: {
    id: number
    thumb: string
    title: string
  }
  Server: {
    title: string
    uuid: string
  }
  Player?: {
    local: boolean
    publicAddress: string
    title: string
    uuid: string
  }
  Metadata: {
    librarySectionType: "show"
    ratingKey: string
    key: string
    parentRatingKey?: string
    skipParent?: boolean
    grandparentRatingKey: "131"
    guid: string
    studio?: string
    parentGuid: string
    grandparentGuid: string
    type: "episode"
    title: string
    grandparentTitle: string
    parentTitle: string
    contentRating: "R"
    summary: string
    audienceRating: number
    viewOffset: number
    year: number
    tagline: string
    index: number
    parentIndex: number
    ratingCount: string
    lastViewedAt: string
    thumb: string
    art: string
    duration: number
    originallyAvailableAt: string
    audienceRatingImage: string
    chapterSource: string
    primaryExtraKey: string
    ratingImage: string
    grandparentThumb: string
    grandparentArt: string
    addedAt: number
    updatedAt: number
    Mood?: payloadEntity[]
    Genre?: payloadEntity[]
    Director?: payloadEntity[]
    Writer?: payloadEntity[]
    Producer?: payloadEntity[]
    Country?: payloadEntity[]
    Role?: payloadEntity[]
    Similar?: payloadEntity[]
    cinemaTrailer: boolean
    subtype: string
    extratype: string
    viewcount: string
    genuineMediaAnalysis: string
    titleSort: string
    live: string
    parentThumb: string
    grandparentTheme: string
    fileInfo: payloadFileInfo[]
    Field: payloadMetadataField[]
  }
}

declare interface payloadFileInfo {
  path: string
  filename: string
  mimetype: string
  size: number
}

declare interface payloadEntity {
  id: number
  tag: string
  count?: number
}

declare interface payloadMetadataField {
  locked: boolean
  name: string
}
