import { Room } from "@/models/rooms";
import sanityClient from "./sanity";
import * as queries from './sanityQueries'

export async function getFeaturedRoom() {
    const result = await sanityClient.fetch<Room>(
      queries.getFeaturedRoomQuery,
      {},
      { cache: 'no-cache' }
    );
  
    return result;
  }

  export async function getRooms(){
    const results = await sanityClient.fetch<Room[]>(queries.getRoomsQuery)
    return results
  }