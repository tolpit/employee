class Debug {

    static log(...message) {
        setTimeout(() => {
            console.log(...message);
        }, 1000);
    }

}

self.Debug = Debug;

export default Debug;