export const PUSH_LIST = "push_list";

export const pushList = (data, callback) => dispaly => {
  dispaly({ type: PUSH_LIST, data: data });
  if (callback) {
    callback();
  }
};
