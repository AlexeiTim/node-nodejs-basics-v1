import os from 'os';
import { Worker } from 'worker_threads';
import { join, resolve } from 'path';

const performCalculations = async () => {
    const cpuCount = os.cpus().length
    const filePath = join(import.meta.dirname, 'worker.js')
    const results = []
    const promisesQueue = Array.from({length: cpuCount}, (_, i) => new Promise((res) => {
        const worker = new Worker(filePath);

        worker.postMessage(10 + i)

        worker.on('message', data => {
            results[i] = {
                status: 'resolved',
                data
            }
            res()
        })
        
        worker.on('error', () => {
            results[i] = {
                status: 'error',
                data: null
            }
            res()
        })

        worker.on('exit', () => {
            res()
        })
    }))
     
    await Promise.all(promisesQueue)
    console.log(results)

};

await performCalculations();