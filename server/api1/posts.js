import Post from '../models/Post';

export const getPosts = (findCriteria, reqLimit, reqPage, cbSuccess, cbFailure) => {
  const limit = reqLimit ? parseInt(reqLimit, 10) : 5;
  const page = reqPage ? parseInt(reqPage, 10) : 1;
  const options = {
    page, limit, sort: { createdAt: -1 }
  };
  return Post.paginate(findCriteria, options, (err, posts) => {
    if (err) return cbFailure(err);
    return cbSuccess(posts.docs);
  });
};

export const getFeed = (findCriteria, reqLimit, reqPage, cbSuccess, cbFailure) => {

}

// NOTE: Deprecated
// const getPosts = ({ findCriteria, limit, cbSuccess }) => {
//   return Post.find(findCriteria).sort({ createdAt: -1 }).limit(limit).exec(
//     (err, posts) => {
//       cbSuccess(posts);
//     }
//   );
// };
