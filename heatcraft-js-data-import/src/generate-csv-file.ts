import * as dotcms from "./lib/dotcms-writer";
import {createDotCmsContentType} from "./lib/dotcms-writer";
import {saveFile} from "./lib/global-util";
import {contentTypeGroups} from "./lib/dotcms-content";
import {collectContentTypeProducts, readProductGroups} from "./lib/dotcms-reader";

async function main() {
    const productGroups = await readProductGroups(true);

    for (const [groupName, contentTypes] of Object.entries(contentTypeGroups)) {
        for (const contentType of contentTypes) {
            const sourceProducts = collectContentTypeProducts(contentType, productGroups);
            const csvRows = dotcms.generateDotCmsCsvRows(contentType, sourceProducts);

            // dump ContentTypes
            await saveFile(
                `../target-dotcms-csv/generated/${groupName}/contentType-${contentType.name}.json`,
                JSON.stringify(createDotCmsContentType(contentType, [], csvRows), null, 2)
            )

            // dump CSV files
            const csvFile = await dotcms.generateDotCmsCsvFile(contentType, csvRows);
            console.log(`Generated ${contentType.name}, rows: ${csvRows.length}`);
            await saveFile(`../target-dotcms-csv/generated/${groupName}/data-${contentType.name}.csv`, csvFile)
        }
    }
}

main().then(() => console.log('All done !')).catch((error) => console.log({error}));



