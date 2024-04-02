import {dotCmsContext} from "./lib/dotcms-api";
import * as webdav from "./lib/webdav";

async function main() {
    await webdav.getOrCreateDirectory(`${dotCmsContext.basePath}/application/themes/heatcraft`);

    if (process.env.UPLOAD_THEME_PARTIAL) {
        await webdav.uploadFile('../heatcraft-dotcms-website/theme/template.vtl', `${dotCmsContext.basePath}/application/themes/heatcraft/template.vtl`)
        await webdav.uploadDirectoryBetter('../heatcraft-dotcms-website/theme/vtl', `${dotCmsContext.basePath}/application/themes/heatcraft/vtl`, true, true)
        await webdav.uploadDirectoryBetter('../heatcraft-dotcms-website/theme/js', `${dotCmsContext.basePath}/application/themes/heatcraft/js`, true, true)
    } else {
        await webdav.uploadDirectoryBetter('../heatcraft-dotcms-website/theme', `${dotCmsContext.basePath}/application/themes/heatcraft`, true, true)
    }
}

main().then(() => console.log('All done !')).catch((error) => console.log({error}));
