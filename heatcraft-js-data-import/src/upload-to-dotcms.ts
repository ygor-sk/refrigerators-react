import * as writer from "./lib/dotcms-writer";
import {contentTypeId, createDotCmsContentType} from "./lib/dotcms-writer";
import {contentTypes} from "./lib/dotcms-content";
import {dotCmsAxios} from "./lib/dotcms-api";
import {collectContentTypeProducts, readProductGroups} from "./lib/dotcms-reader";
import _ from "lodash";

async function main() {
    let workflowListResponse = await dotCmsAxios.get(`/api/v1/workflow/schemes`);
    let workflows = workflowListResponse.data.entity;
    let systemWorkflowId = workflows.filter(workflow => workflow.system === true)[0]['id'];

    const productGroups = await readProductGroups(false);

    // delete types
    for (const contentType of contentTypes) {
        console.log(`Deleting content type ${contentType.name}.`);
        await dotCmsAxios.delete(`/api/v1/contenttype/id/${contentTypeId(contentType)}`)
            .catch(error => {
                if (error.response.status !== 404) throw error;
            });
        console.log(`Deleted content type ${contentType.name}.`);
    }

    // create types and upload data
    for (const contentType of contentTypes) {
        let sourceProducts = collectContentTypeProducts(contentType, productGroups);
        let contentProducts = writer.generateDotCmsCsvRows(contentType, sourceProducts);

        console.log(`Creating content type ${contentType.name}.`);
        await dotCmsAxios.post(`/api/v1/contenttype/`, createDotCmsContentType(contentType, [systemWorkflowId], contentProducts));
        console.log(`Created content type ${contentType.name}.`);

        console.log(contentProducts.length);
        let chunkIndex = 0;
        for (const chunk of _.chunk(contentProducts, 30000)) {
            console.log(`Uploading ${contentType.name}, chunk index: ${chunkIndex++}, chunk size: ${chunk.length}, total count: ${contentProducts.length}`);
            let payload = {
                contentTypeId: contentTypeId(contentType),
                items: chunk
            };
            console.log(chunk.length);
            await dotCmsAxios
                .post(`/api/heatcraft/import`, payload)
                .then(() => console.log(`Uploaded ${contentType.name}, count: ${contentProducts.length}`))
                .catch((error) => {
                    console.log(`Error uploading ${contentType.name}, count: ${contentProducts.length}. Error: ${error}`);
                });
        }
    }
}
main().then(() => console.log('All done !')).catch((error) => console.log({error}));



