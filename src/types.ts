type FacebookUrl = `https://www.facebook.com/${string}`
type FacebookImageUrl = `https://scontent.ftlv5-1.fna.fbcdn.net/v/${string}`

export type ListingCardData = {
  id: number
  city: "Tel Aviv"
  type: "Sublet"
  postDate: string
  startDate: string
  endDate?: string
  imageUrls: FacebookImageUrl[]
  roomCount: number
  area?: number
  price?: number
  floorNumber?: number
  streetOrNeighborhood?: string
}

export type ListingFullData = ListingCardData & {
  fullText: string
  postUrl: FacebookUrl
  phoneNumber: string
  posterProfile: FacebookUrl
}
