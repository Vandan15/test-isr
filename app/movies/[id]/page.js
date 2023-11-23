import { fetchAPI } from '@/common/actions';
import { MOVIE, MOVIES } from '../graphql/queries';

// export const dynamicParams = true;
// export const revalidate = 10;

export async function generateStaticParams() {
  const data = await fetchAPI(MOVIES);
  return data?.movies?.data?.map((item) => {
    return { id: item?.id };
  });
}

const Page = async ({ params: { id } }) => {
  const data = await fetchAPI(MOVIE, {
    movieId: id,
  });

  return (
    <div className="p-4">
      <div className="w-[60%] m-auto pt-11"></div>
      <div className="p-16">
        <h1 className="text-2xl font-semibold">{data?.movie.data.title}</h1>
        <p className="text-gray-600">{data?.movie.data.overview}</p>
        <div className="my-4">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">Adult:</td>
                <td className="text-green-600">
                  {data?.movie.data.adult ? 'Yes' : 'No'}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">Budget:</td>
                <td className="text-green-600">${data?.movie.data.budget}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">
                  Original Language:
                </td>
                <td className="text-green-600">
                  {data?.movie.data.originalLanguage}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">
                  Release Date:
                </td>
                <td className="text-green-600">
                  {data?.movie.data.releaseDate}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">Revenue:</td>
                <td className="text-green-600">${data?.movie.data.revenue}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold text-blue-600 pr-4">Runtime:</td>
                <td className="text-green-600">
                  {data?.movie.data.runtime} minutes
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-blue-600 pr-4">Status:</td>
                <td className="text-green-600">{data?.movie.data.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
