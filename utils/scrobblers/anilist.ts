import { GraphQLClient, gql } from 'graphql-request'
import { PrismaClient } from '@prisma/client'

const MEDIA_LIST_QUERY = gql`
  query MediaList($userId: Int!, $mediaId: Int!) {
    MediaList(userId: $userId, mediaId: $mediaId) {
      media {
        title {
          romaji
        }
      }
      progress
    }
  }
`

const MEDIA_UPDATE_MUTATION = gql`
  mutation SaveMediaListEntry($mediaId: Int!, $progress: Int!) {
    SaveMediaListEntry(mediaId: $mediaId, progress: $progress) {
      id
      progress
    }
  }
`

const scrobble = async (
  providerMediaId: string,
  providerUserId: string,
  userId: string,
  episode: number,
  accessToken: string,
  prisma: PrismaClient,
) => {
  const graphQLClient = new GraphQLClient('https://graphql.anilist.co/', {
    headers: {
      authorization: 'Bearer ' + accessToken,
    },
  })
  const scrobble = await createScrobble(
    episode,
    providerMediaId,
    userId,
    prisma,
  )
  const mediaListEntry = await graphQLClient
    .request(MEDIA_LIST_QUERY, { providerUserId, providerMediaId })
    .catch((error) => {
      return null
    })
  if (mediaListEntry?.MediaList.progress >= episode) {
    await createScrobbleInstance(
      scrobble.id,
      'IGNORED',
      'List progress equals or exceeds episode number',
      prisma,
    )
    return {
      error: 'List progress equals or exceeds episode number',
    }
  }
  await graphQLClient.request(MEDIA_UPDATE_MUTATION, {
    mediaId: providerMediaId,
    progress: episode,
  })

  await createScrobbleInstance(scrobble.id, 'SUCCESS', '', prisma)
  return { data: 'ok' }
}

const createScrobble = async (
  episode: number,
  providerMediaId: string,
  userId: string,
  prisma: PrismaClient,
) => {
  return await prisma.scrobbleItem.create({
    data: {
      episode,
      providerMediaId,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

const createScrobbleInstance = async (
  scrobbleItemId: string,
  status: 'ERROR' | 'SUCCESS' | 'PENDING' | 'IGNORED',
  statusReason: string,
  prisma: PrismaClient,
) => {
  return await prisma.scrobbleInstance.create({
    data: {
      status,
      statusReason,
      scrobble: {
        connect: {
          id: scrobbleItemId,
        },
      },
    },
  })
}

const retryScrobble = (scrobbleId: string) => {
  //tmp
  return true
}

export { scrobble, retryScrobble }
