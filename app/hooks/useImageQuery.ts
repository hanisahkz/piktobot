import ky from 'ky'
import { useQuery } from '@tanstack/react-query'

// TODO: Update the endpoint to be used
// Hardcoding data using API: https://collectionapi.metmuseum.org/public/collection/v1/objects/98
const fetchImage = async () => {
  const parsed = await ky('https://collectionapi.metmuseum.org/public/collection/v1/objects/98').json()
  console.log("inspect data: ", parsed)
  return parsed;
}

const useImageQuery = () => {
  return useQuery({
    queryKey: ['image'],
    queryFn: () => fetchImage(),
  })
}

export { useImageQuery, fetchImage }