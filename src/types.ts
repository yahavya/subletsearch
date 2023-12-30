type FacebookUrl = `https://www.facebook.com/${string}`
//type FacebookImageUrl = `https://scontent.ftlv${number}-1.fna.fbcdn.net/v/${string}`

type FacebookImageUrl = string

export type ListingCardData = {
  id: number
  city: "Tel Aviv"
  postUrl: string
  //type: "Sublet"
  postDate: string
  startDate: string
  endDate?: string
  imageUrls: FacebookImageUrl[]
  roomCount: number
  area?: number
  price?: number
  floorNumber?: number
  street?: string
  neighborhood?: string
}

export type ListingFullData = ListingCardData & {
  fullText: string
  postUrl: FacebookUrl
  phoneNumber: string
  posterProfile: FacebookUrl
}
