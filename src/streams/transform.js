import { Transform } from 'stream';

const reverseTransform = new Transform({
    transform(chunk, _, cb) {
        cb(null, chunk.toString().split('').reverse().join(''))
    }
})

const transform = async () => {
    process.stdin.pipe(reverseTransform).pipe(process.stdout)
};

await transform();