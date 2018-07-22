# google-spreadsheet-to-excel-generator

Made this just to help a friend who had his spreadsheet generated by a service and saved at google drive, and needed
a Excel file with that data based on template. So it is.

To generate a file, you need:

1. Get your credentials at google drive and save its json at root as `creds.json`.
1. Create a env like this:
    ```
    SPREADSHEET_ID=THE_GOOGLE_SPREADSHEET_ID_AT_URL
    ```
1. Run `npm start` (or `npm run start:verbose` if you want to see details)
1. That's it!

## Environment variables

You can use all these variables below:
```
SPREADSHEET_ID, // This is required, others are optional and will be set with default values
TEMPLATE_FILENAME = 'template.xlsx',
TEMPLATE_FOLDER = 'templates',
DESTINATION_FILENAME = 'result.xlsx',
DESTINATION_FOLDER = '',
DATETIME_OUTPUT_FORMAT = 'YYYY-MM-DD HH:mm',
```

## Next steps

Create an smart row parser that reads an json and understand
how to parse the row values. That would be cool.