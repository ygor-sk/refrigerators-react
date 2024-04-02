import {dotCmsWebDav} from "./dotcms-api";
import path from "path";
import fs from "fs";
import _ from "lodash";

export async function deleteFileOrDirectory(fileOrDirectoryName: string) {
    await dotCmsWebDav.deleteFile(fileOrDirectoryName).catch(notFoundAsNull);
}

export interface DotCmsFile   {
    filename: string,
    basename: string,
    lastmod: Date,
    size: number,
    type: 'file' | 'directory',
    etag: string,
    mime: string
}

export async function getOrCreateDirectory(directoryName: string): Promise<DotCmsFile[]> {
    const directory: DotCmsFile[] = await dotCmsWebDav.getDirectoryContents(directoryName).catch(notFoundAsNull);
    if (directory === null) {
        const missingDirs = [];
        let dirName = directoryName;
        let dirExists = false;
        while (!dirExists) {
            missingDirs.push(dirName);
            dirName = path.dirname(dirName);
            dirExists = await dotCmsWebDav.getDirectoryContents(dirName).catch(notFoundAsNull) !== null
        }
        missingDirs.reverse();
        for (const missingDir of missingDirs) {
            console.log(`Creating directory: ${missingDir}`);
            await dotCmsWebDav.createDirectory(missingDir);
        }
        return await dotCmsWebDav.getDirectoryContents(directoryName);
    } else {
        return directory;
    }
}

export async function uploadFile(localFile: string, webDavFile: string) {
    console.log(`Uploading ${localFile} to ${webDavFile}`);
    await fs.createReadStream(localFile).pipe(dotCmsWebDav.createWriteStream(webDavFile))
}

export async function uploadDirectory(localDirectory: string, webDavDirectory: string) {
    const files = await fs.promises.readdir(localDirectory);
    for (const file of files) {
        const localFile = path.join(localDirectory, file);
        const webDavFile = path.join(webDavDirectory, file);
        const fileStat = await fs.promises.stat(localFile);
        if (fileStat.isDirectory()) {
            await getOrCreateDirectory(webDavFile);
            await uploadDirectory(localFile, webDavFile)
        } else {
            await uploadFile(localFile, webDavFile);
        }
    }
}

export async function uploadDirectoryBetter(localDirectory: string, webDavDirectory: string,
                                            overwriteExisting: boolean = false, deleteOrphans: boolean = false) {
    const localFileNames = await fs.promises.readdir(localDirectory);
    let targetFiles = await getOrCreateDirectory(webDavDirectory);

    if (deleteOrphans) {
        for (const targetFile of targetFiles) {
            if (!_.includes(localFileNames, targetFile.basename)) {
                console.log(`Deleting orphan file/directory: ${targetFile.filename}`);
                await deleteFileOrDirectory(targetFile.filename);
            }
        }
    }

    for (const localFileName of localFileNames) {
        const localFile = path.join(localDirectory, localFileName);
        const webDavFile = path.join(webDavDirectory, localFileName);
        const localFileStat = await fs.promises.stat(localFile);
        if (localFileStat.isDirectory()) {
            await getOrCreateDirectory(webDavFile);
            await uploadDirectoryBetter(localFile, webDavFile, overwriteExisting, deleteOrphans);
        } else {
            let webdavFileExists = _.some(targetFiles, (targetFile) => targetFile.basename === localFileName);
            if (webdavFileExists && !overwriteExisting) {
                console.log(`File already exists: ${webDavFile}. Will not be overwritten.`)
            } else {
                if (webdavFileExists) {
                    console.log(`Uploading and overwriting ${localFile} to existing ${webDavFile}`);
                } else {
                    console.log(`Uploading ${localFile} to ${webDavFile}`);
                }

                await fs.createReadStream(localFile).pipe(dotCmsWebDav.createWriteStream(webDavFile))
            }
        }
    }

}

function notFoundAsNull(e) {
    if (e.response && e.response.status && e.response.status === 404) {
        return null;
    } else {
        throw e;
    }
}
