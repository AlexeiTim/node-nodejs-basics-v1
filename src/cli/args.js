const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = [];
    for (let i = 0; i < args.length - 1; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        result.push(`${key.replace('--', '')} is ${value}`)
    }
    console.log(result.join(', '))
};

parseArgs();