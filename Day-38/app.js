
/*------------------------------------------------------------------------
    Day 38: File Streaming
            Stream files instead of reading them entirely into memory
-------------------------------------------------------------------------*/

const fs = require('fs');

const readStream = fs.createReadStream('path/to/your/file', {
  highWaterMark: 1024 * 1024, // Chunk size in bytes (1MB in this example)
  encoding: 'utf8' // Optional: specify encoding if it's a text file
});

readStream.on('data', (chunk) => {
  // Process each chunk of data
  console.log('Received chunk:', chunk);
});

readStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

readStream.on('end', () => {
  console.log('Finished reading file');
});