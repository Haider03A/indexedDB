let result;
let id = 1;

const connectingDB = _ => {
    const indexedDB = window.indexedDB;
    const db = indexedDB.open('haider');

    db.onupgradeneeded = _ => {
        result = db.result;
        const store = result.createObjectStore('musics', { keyPath: 'id' });
    }

    db.onsuccess = _ => {
        result = db.result;
        const data = result.transaction('musics', "readwrite").objectStore("musics");
        data.put({ id, title: 'nafa' });
        // console.log(data.getAll());
    }
}

connectingDB()


const file = document.querySelector("input[type=file]");

const createCodeSRC = file => {
    return new Promise(((res, rej) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            res(reader.result);

        },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        } else {
            rej('err')
        }
    

    }))

}


file.addEventListener('input', async function (e) {
    try {
        const src = await createCodeSRC(file.files[0]);
        const audioEle = document.createElement('audio');
        const sourceEle = document.createElement('source');
        audioEle.controls = true
        sourceEle.type = 'audio/mp3'
        sourceEle.src = src
        audioEle.appendChild(sourceEle)
        document.querySelector('body').appendChild(audioEle)


        console.log(src);
    } catch (err) {
        console.log(err);
    }
})
