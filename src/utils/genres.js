// const API_KEY = import.meta.env.VITE_API_KEY;

// export async function fetchGenres() {
//   const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=ko`, {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`
//     }
//   });
//   const data = await res.json();

//   return Object.fromEntries(data.genres.map(({id, name}) => [id, name]));
// }
