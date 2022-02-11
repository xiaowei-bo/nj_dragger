import crypto from "crypto";
export function createMD5(file) {
    return new Promise(resolve => {
        const buffer = fs.readFileSync(file);
        const hash = crypto.createHash('md5');
        hash.update(buffer, 'utf8');
        const md5 = hash.digest('hex');
        resolve(md5);
    })
}