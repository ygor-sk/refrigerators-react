import {contentTypeGroups} from "./lib/dotcms-content";
import {ContentDataType} from "./lib/dotcms-writer";
import * as xl from 'excel4node';
import {collectContentTypeProducts, readProductGroups} from "./lib/dotcms-reader";
import {collectDistinctValues} from "./lib/global-util";
import * as dotcms from "./lib/dotcms-writer";

async function main() {
    let productGroups = await readProductGroups(false);
    for (const [groupName, contentTypes] of Object.entries(contentTypeGroups)) {
        const wb = new xl.Workbook()
        const headerStyle = wb.createStyle({font: {bold: true}});
        for (const contentType of contentTypes) {
            const sourceProducts = collectContentTypeProducts(contentType, productGroups);
            const csvRows = dotcms.generateDotCmsCsvRows(contentType, sourceProducts);

            const ws = wb.addWorksheet(contentType.name.replace("ProductX4", ""));
            ["ID", "Description", "Data type", "Enum", "Unique", "Required"].forEach((attr, idx) => {
                ws.cell(1, idx + 1).string(attr).style(headerStyle);
            })
            ws.column(1).setWidth(30);
            ws.column(2).setWidth(50);
            ws.column(3).setWidth(10);
            ws.column(4).setWidth(10);
            ws.column(5).setWidth(10);
            ws.column(6).setWidth(10);
            contentType.attributes.forEach((attribute, idx) => {
                ws.cell(idx + 2, 1).string(attribute.id);
                ws.cell(idx + 2, 2).string(attribute.description);
                ws.cell(idx + 2, 3).string(formatDataType(attribute.dataType));
                if (attribute.dataType === ContentDataType.SELECT) {
                    ws.cell(idx + 2, 4).string('yes');
                    ws.cell(idx + 2, 4).comment(collectDistinctValues(attribute.id, csvRows).join("\n"));
                }
                if (attribute.unique === true) {
                    ws.cell(idx + 2, 5).string('yes');
                }
                if (attribute.required === true) {
                    ws.cell(idx + 2, 6).string('yes');
                }
            });

        }
        wb.write(`../target-xlsx/${groupName}.xlsx`);
    }
}

function formatDataType(dataType: ContentDataType): string {
    switch (dataType) {
        case ContentDataType.BOOLEAN:
            return 'boolean';
        case ContentDataType.INTEGER:
            return 'integer';
        case ContentDataType.FLOAT:
            return 'float';
        case ContentDataType.FILE:
            return 'file';
        case ContentDataType.TEXT:
        case ContentDataType.SELECT:
        default:
            return 'text';
    }
}

main().then(() => console.log('All done !')).catch((error) => console.log({error}));



