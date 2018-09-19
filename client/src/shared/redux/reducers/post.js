import {
  GET_POST_BY_ID
} from '../actions/post';

const initState = {
  main: {
    createdAt: "2018-09-19T05:12:22.697Z",
    context: {
      project:null,
      community:null,
      post:"5ba1d08c62ad181c535f6213"
    },
    editedOn: "2018-09-19T05:15:12.325Z",
    tags:[],
    hearts:[],
    thumbUps:[],
    comments:[],
    _id: "5ba1dab6b404695e3b445484",
    content:"{\"blocks\":[{\"key\":\"bc2h5\",\"text\":\"hi hi hi\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    postedBy: "5ac7f2b6cc78928a6f24a101"
  },
};

export default function project(state = initState, action) {
  switch (action.type) {
    case GET_POST_BY_ID:
      return {
        ...state,
        main: action.data
      }
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
