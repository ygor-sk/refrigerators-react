import Axios from "axios";
import {createClient} from "webdav";

export const dotCmsContext = {
    host: process.env.DOTCMS_HOST || 'http://localhost:8080',
    username: process.env.DOTCMS_USERNAME || 'admin@dotcms.com',
    password: process.env.DOTCMS_PASSWORD || "admin",
    basePath: process.env.DOTCMS_BASE_PATH || "/default",
};

export const dotCmsAxios = Axios.create({
    baseURL: dotCmsContext.host,
    auth: {
        username: dotCmsContext.username,
        password: dotCmsContext.password
    }
});

export const dotCmsWebDav = createClient(dotCmsContext.host + "/webdav/live/1", {
    username: dotCmsContext.username,
    password: dotCmsContext.password,
});
