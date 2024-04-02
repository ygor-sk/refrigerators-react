import {dotCmsContext} from "./lib/dotcms-api";
import * as webdav from "./lib/webdav";

async function main() {
    await webdav.uploadDirectoryBetter(
        '../source-file/assets/resources', `${dotCmsContext.basePath}/resources`,
        process.env.OVERWRITE === "true",
        true
    )
}

main().then(() => console.log('All done !')).catch((error) => console.log({error}));



