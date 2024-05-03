import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'


function * run () {
    for( let index = 0 ; index < 99 ; index++ ) {
        const data = {
            id: randomUUID(),
            name: `Frannklin.${index}`,
        }
        yield data
    }
}
async function handler(request, response) {
    const readable = new Readable({
        read() {
            for (const data of run ()) {
                console.log(`Pushing: ${JSON.stringify(data)}`)
                this.push(JSON.stringify(data) + '\n')
            }

            this.push(null) // end the stream
        }
    })

    readable
    .pipe(response)

}

http.createServer(handler)
.listen(3000)
.on('listening', () => {
  console.log('Server listening on port 3000')
})