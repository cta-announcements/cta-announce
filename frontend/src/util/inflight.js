// aggressive inflight
const inflight = {

    // active and resolved promises list
    promises: {},

   async new(key, asyncTask) {
    // the key is some sort of unique identifier. The callback is 
    // used to capture the promise

    // if the promise has already been registered, just return it
    if (this.promises[key]) {
        return await this.promises[key];
    }

    // otherise, register it and then return it
    this.promises[key] = asyncTask();
    return await this.promises[key];
   }
}

module.exports = inflight;