import resStatusConfig from "../config/resStatusConfig.js";
import messages from "../consts/messages.js";

export const get404 = (req, res, next) => {
    console.log(messages.pageNotFound);
    
    res.status(resStatusConfig.Page_Not_Found)
    .send(messages.pageNotFound)
    .end();
};