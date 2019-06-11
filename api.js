const apiKey = '4d4LkHtK0Tei4N3k3WUMG_Q7RTZT8TtfxKdckgsMpzkr_zVg3WrZZy0T2DStXEI0punIQBeXi6fF_4efsynMk3yJjBjqPRAOjdrNGc1pTigE-mpnH31n6gVLahGUXHYx'
const num = 5

const processLocation = location => ({
  key: location.id,
  name: location.name,
  coords: location.coordinates,
  pinColor: 'blue',
})

export const fetchPlaces = async location => {
  try {
    var res = await fetch(`https://api.yelp.com/v3/businesses/search?categories=coffee&radius=8000&latitude=${location.coords.latitude}&longitude= ${location.coords.longitude}&sort_by=distance&limit=${num}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    })
  } catch (err) {
    console.log(err.message);

  }
  let { businesses } = await res.json()
  return businesses.map(processLocation)
}
