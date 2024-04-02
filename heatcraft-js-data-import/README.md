## DotCMS import tool 

This directory contains a prototype of a data import tool for Lennox DotCMS installation.

The prototype is not hosted anywhere, it is meant to be run from developer's machine. 
It is implemented in Node/Typescript and connects to DotCMS installation via REST API.
One possible evolution of this prototype is an DotCMS OSGi plugin, that will run directly 
on the DotCMS installation and will be interacted with using custom screens in DotCMS
admin interface. 

Directory `source-mysql` contains a Docker MySQL image, pre-filled with data extracted from 
Catalogue Studio - SQL Server 2008 dump file. Only subset of data is part of the image. 
The part belongs to categories `HC040` (Side Mount) and `HC042` (Top Mount) 
from `PRO³ Packaged Refrigeration System` from `Compressorized Products`.    

Directory `source-xlsx` contains Excel sheets with new products.

Directory `target-analysis` contains intermediate files, that allow to have a more
consolidated look at files read from SQL and XLSX sources.  

Directory `target-dotcms-csv` contains CSV files, which can be imported into DotCMS using
the admin interface `Content` / `Search` / `Import content`.

Files in directories `target-analysis` and `target-dotcms-csv` are being overwritten
every time the worker runs the `generate-csv-file` NPM script. 

Directory `worker` contains the import tool itself.

## Usage
While we are still importing legacy products, we need to have an instance of MySQL database running: 
```
docker-compose up
```

Generating DotCMS CSV import files:
```
npm run generate-csv-file
```

To connect to DotCMS, recreate all content types and upload all products:
```
DOTCMS_HOST=https://prod-heatcraft.dotcmscloud.com \
DOTCMS_USERNAME=email@address \
DOTCMS_PASSWORD=pass \
npm run upload-to-dotcms
```
