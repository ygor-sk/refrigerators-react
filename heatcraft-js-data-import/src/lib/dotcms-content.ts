import {ContentKind, ContentType} from "./dotcms-writer";

function filterContentTypes(contentTypes: ContentType[]) {
    const filterEnabled = false;
    const filterBy = [
        'ProductV7WalkInUnitCoolersNewDetails',
    ];
    return filterEnabled ? contentTypes.filter(x => filterBy.indexOf(x.name) !== -1) : contentTypes;
}

export const contentTypeGroups: { [groupName: string]: ContentType[] } = {
    'Pro3PackagedNew': filterContentTypes(require('./dotcms-content-pro3_packaged-new').contentTypes),
    'Pro3PackagedLegacy': filterContentTypes(require('./dotcms-content-pro3_packaged-legacy').contentTypes),
    'WalkInUnitCoolersNew': filterContentTypes(require('./dotcms-content-walk_in_unit_coolers-new').contentTypes),
    'WalkInUnitCoolersLegacy': filterContentTypes(require('./dotcms-content-walk_in_unit_coolers-legacy').contentTypes),
    'Generic': filterContentTypes(require('./dotcms-content-generic').contentTypes),
}

export const contentTypes: ContentType[] = Object.values(contentTypeGroups).flat();

export const contentKinds: ContentKind[] = [...new Set(contentTypes.map(contentType => contentType.contentKind))];