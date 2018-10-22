import Notif from '../models/Notif';

export const createNotif = ({
  fromUser,
  toUser,
  action,
  ref
}) => {
  if (fromUser.equals(toUser)) return;
  const newNotif = new Notif();
  newNotif.fromUser = fromUser;
  newNotif.toUser = toUser;
  newNotif.action = action;
  newNotif.ref = ref;
  newNotif.save();
};

export const getNotifs = (findCriteria, reqLimit, reqPage, cbSuccess, cbFailure) => {
  const limit = reqLimit ? parseInt(reqLimit, 10) : 5;
  const page = reqPage ? parseInt(reqPage, 10) : 1;
  const options = {
    page, limit, sort: { createdAt: -1 }
  };
  return Notif.paginate(findCriteria, options, (err, notifs) => {
    if (err) return cbFailure(err);
    return cbSuccess(notifs.docs);
  });
};
